import {
  contentCreator,
  convertToResponseObject,
  createObjectTemplate,
  getDataFromDatabaseByFilter,
  progressCreator,
  saveData,
  restoreChallenges,
} from "../../internal.js";
import config from "../../Config/config.js";

function updateCategory(category) {
  const functionKey = "updateData";
  const code = (args) => {
    // Fill in the blanks
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Category could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      category[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function addChallenge(category) {
  const functionKey = "addChallenge";
  const code = (challenge) => {
    if (challenge === null) {
      throw new Error("Challenge had value null. Please input a challenge.");
    }

    const found = category.challenges.filter((object) => {
      return object.data.id === challenge.data.id;
    });

    if (found.length > 0) {
      return "Challenge exist from before.";
    }

    category.challenges.push(challenge);
    return "Challnge successfully added.";
  };

  return createObjectTemplate(functionKey, code);
}

function removeChallenge(category) {
  const functionKey = "removeChallenge";
  const code = (challenge) => {
    if (challenge === null) {
      throw new Error("Challenge had value null. Please input a challenge.");
    }

    const challengeIDs = category.challenges.map((object) => {
      return object.data.id;
    });

    const position = challengeIDs.indexOf(challenge.data.id);
    if (position === -1) {
      return "Challenge does not exist in this category";
    }

    category.challenges.splice(position, 1);
    return "Challenge successfully removed.";
  };

  return createObjectTemplate(functionKey, code);
}

function restoreObject() {
  const functionKey = "restoreObject";
  const code = (category, categoryData) => {
    return new Promise((resolve, reject) => {
      const { contentID, progressID, challenges } = categoryData;
      const contentData = getDataFromDatabaseByFilter(
        "id",
        contentID,
        config.db.table.content
      );
      const progressData = getDataFromDatabaseByFilter(
        "id",
        progressID,
        config.db.table.progress
      );

      const challengeList = restoreChallenges(challenges);

      Promise.all([contentData, progressData, challengeList])
        .then((data) => {
          let content = [];
          let progress = [];

          if (data[0] != null) {
            content = data[0][0];
            category.content.updateData(content);
          }

          if (data[1] != null) {
            progress = data[1][0];
            category.progress.updateData(progress);
          }

          if (data[2] != null) {
            categoryData.challenges = data[2];
          }

          category.updateData(categoryData);
          resolve(convertToResponseObject("category", category));
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return createObjectTemplate(functionKey, code);
}

function deleteCategory(category) {
  const functionKey = "deleteCategory";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      challenges: [],
    },
  };
}

function categoryCreator() {
  const content = contentCreator();
  const category = emptyData();
  const progress = progressCreator();

  return {
    ...content,
    ...progress,
    ...category,
    ...updateCategory(category.data),
    ...addChallenge(category.data),
    ...removeChallenge(category.data),
    ...restoreObject(),
    ...saveData(),
    ...deleteCategory(category.data),
  };
}

export { categoryCreator };
