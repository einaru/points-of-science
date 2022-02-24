import { GraphQLList } from "graphql";
import {
  ActivityInputModel,
  ChallengeResponseModel,
  ChallengeInputModel,
  ChallengeModel,
  ReflectionInputModel,
  RewardInputModel,
  categoryCreator,
  challengeCreator,
  createActivity,
  createChallenge,
  createContent,
  createReflection,
  createReward,
} from "../../../internal.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";

// Root Queries - Used to retrieve data with GET-Requests

const getAllChallengesQuery = {
  type: new GraphQLList(ChallengeModel),
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    const challengesData = await providers.challenges.getAll();
    const challenges = [];
    challengesData.forEach((challengeData) => {
      const challenge = challengeCreator(challengeData.reflectionType);
      challenge.restoreObject(challenge, challengeData);
      challenges.push(challenge.convertToResponseObject(challenge));
    });

    return challenges;
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests

const createChallengeQuery = {
  type: ChallengeResponseModel,
  args: {
    challenge: { type: ChallengeInputModel },
    reward: { type: RewardInputModel },
    reflection: { type: ReflectionInputModel },
    activity: { type: ActivityInputModel },
  },
  async resolve(_, args, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);

    const { categoryID, image, description, difficulty } = args.challenge;
    const title = args.challenge.name;
    const { maxPoints, firstTryPoints, bonusPoints } = args.reward;
    const { solution, reflectionType, choices } = args.reflection;
    const reflectionTitle = args.reflection.title;
    const { type, hints, resources } = args.activity;
    const activityDescription = args.activity.description;

    let categoryData;
    if (categoryID.trim().length === 0) {
      throw new Error(
        "Category you try to add the challenge to does not exist. Please create a Category before creating a Challenge."
      );
    }

    if (categoryID.trim().length > 0) {
      const storedCategory = await providers.categories.getByID(categoryID);
      if (storedCategory == null) {
        throw new Error(
          "Category you try to add the challenge to does not exist. Please create a Category before creating a Challenge."
        );
      }

      categoryData = storedCategory;
    }

    const category = categoryCreator();
    const challenges = await providers.challenges.getAll();
    await category.restoreObject(category, categoryData, challenges);

    const challenge = createChallenge(categoryID, difficulty, reflectionType);
    createContent(challenge.content, title, image, description);
    createReward(challenge.reward, maxPoints, firstTryPoints, bonusPoints);
    createReflection(challenge.reflection, reflectionTitle, solution, choices);
    createActivity(
      challenge.activity,
      type,
      activityDescription,
      hints,
      resources
    );

    category.addChallenge(challenge);
    const data = challenge.convertToStoredObject(challenge);
    const object = await providers.challenges.add(data);
    challenge.data.id = object.id;
    const categoryObject = category.convertToStoredObject(category);
    await providers.categories.update(categoryObject.id, categoryObject);

    return challenge.convertToResponseObject(challenge);
  },
};

export { createChallengeQuery, getAllChallengesQuery };
