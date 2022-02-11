import {
  authenticateAccessToken,
  AllChallengesResponseModel,
  ChallengeResponseModel,
  ChallengeInputModel,
  categoryCreator,
  challengeCreator,
  checkPermissionLevel,
  getData,
  getFilter,
  getDataByFilter,
  nextID,
} from "../../../internal.js";
import config from "../../../Config/config.js";

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

// Root Queries - Used to retrieve data with GET-Requests

const getAllChallengesQuery = {
  type: AllChallengesResponseModel,
  args: {},
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const challengesData = await getData(config.db.table.challenge);
      let challenges = [];
      challengesData.forEach((challengeData) => {
        const challenge = challengeCreator();
        challenges.push(challenge.restoreObject(challenge, challengeData));
      });

      const response = getResponseObject(
        "Challenges retrieved successfully",
        200,
        config.responseType.success
      );

      challenges = await Promise.all(challenges);
      response.data = challenges;
      return response;
    } catch (error) {
      return error;
    }
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests

const createChallengeQuery = {
  type: ChallengeResponseModel,
  args: {
    challenge: { type: ChallengeInputModel },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      let response = checkPermissionLevel(
        config.permissionLevel.admin,
        context.user
      );

      if (response.type === "error") {
        return response;
      }

      const input = args.challenge;
      const { categoryID, title, image, description, difficulty } = input;

      let categoryData;
      if (categoryID.trim().length === 0) {
        return getResponseObject(
          "Category you try to add the challenge to does not exist. Please create a Category before creating a Challenge.",
          400,
          config.responseType.error
        );
      }

      if (categoryID.trim().length > 0) {
        const filter = getFilter({
          key: "id",
          operator: "==",
          value: categoryID,
        });
        const storedCategory = await getDataByFilter(
          config.db.table.category,
          filter
        );

        if (storedCategory == null) {
          return getResponseObject(
            "Category you try to add the challenge to does not exist. Please create a Category before creating a Challenge.",
            400,
            config.responseType.error
          );
        }

        [categoryData] = storedCategory;
      }

      const category = categoryCreator();
      await category.restoreObject(category, categoryData);

      const challengeID = nextID(config.db.table.challenge);

      const contentID = nextID(config.db.table.content);
      const contentData = {
        id: contentID,
        title,
        image,
        description,
      };

      const challenge = challengeCreator();
      const newChallenge = {
        id: challengeID,
        categoryID,
        difficulty: difficulty || 1,
      };
      challenge.updateData(newChallenge);

      challenge.content.updateData(contentData);

      await challenge.content.saveData(
        "content",
        challenge.content,
        config.db.table.content,
        "Content stored successfully."
      );

      category.addChallenge(challenge);
      await category.saveData(
        "category",
        category,
        config.db.table.category,
        "Category stored successfully."
      );

      response = await challenge.saveData(
        "challenge",
        challenge,
        config.db.table.challenge,
        "Challenge stored successfully."
      );

      return response;
    } catch (error) {
      return error;
    }
  },
};

export { createChallengeQuery, getAllChallengesQuery };
