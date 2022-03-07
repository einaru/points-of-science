import { GraphQLList, GraphQLString } from "graphql";
import {
  ActivityInputModel,
  ChallengeResponseModel,
  ChallengeInputModel,
  ChallengeModel,
  NormalResponseModel,
  ReflectionInputModel,
  RewardInputModel,
  UserChallengeInputModel,
  UserChallengeModel,
  categoryCreator,
  isPermissionGroup,
  challengeCreator,
  createActivity,
  createChallenge,
  createContent,
  createReflection,
  createReward,
  leaderboardCreator,
  profileCreator,
  progressCreator,
  userChallengeCreator,
} from "../../../internal.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";
import { UserInputError } from "../error.js";

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
      const response = challenge.convertToResponseObject(challenge);
      if (user.permission === 3) {
        delete response.reward;
      }
      challenges.push(response);
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

const addUserChallengeQuery = {
  type: UserChallengeModel,
  args: {
    userChallenge: { type: UserChallengeInputModel },
  },
  async resolve(_, args, { user, providers, pubsub }) {
    assertIsAuthenticated(user);

    const challenge = await providers.challenges.getByID(
      args.userChallenge.challengeID
    );

    if (challenge == null) {
      throw new Error(
        "Could not add user challenge as challenge does not exist."
      );
    }

    const userChallengeData = args.userChallenge;
    const userChallenge = userChallengeCreator();
    userChallengeData.userID = user.id;
    userChallengeData.categoryID = challenge.categoryID;
    userChallengeData.difficulty = challenge.difficulty;
    userChallenge.updateData(userChallengeData);
    const { userActivity, userReflection } = userChallenge;
    userActivity.updateData(userChallengeData.activity);
    userReflection.updateData(userChallengeData.reflection);

    const userData = await providers.users.getByID(user.id);
    let userChallenges = userData.challenges;
    userChallenges = userChallenges.filter((object) => {
      return challenge.id === object.challengeID && object.userID === user.id;
    });

    const isFirstTry = !userChallenges.length;
    const allPoints = userChallenges.filter((object) => {
      if (object.reward) {
        return object.reward.points >= challenge.reward.maxPoints;
      }
    });

    const hasNotAllPoints = !allPoints.length;
    userChallenge.calculatePoints(
      userChallenge,
      challenge,
      isFirstTry,
      hasNotAllPoints
    );
    userChallenge.isAnsweredCorrect(userChallenge, challenge);
    userChallenge.isCompleted(userChallenge);

    const storedUserChallenge =
      userChallenge.convertToStoredObject(userChallenge);

    const { calculateProgress } = progressCreator().progress;
    const categoriesData = await providers.categories.getAll();

    const profile = profileCreator();
    profile.updateData(userData);
    profile.add(profile.data.challenges, storedUserChallenge);
    const userProgress = {
      progress: {
        categories: [],
        achievements: [],
      },
    };

    categoriesData.forEach((categoryData) => {
      const challengeIDs = categoryData.challenges;
      const progress = calculateProgress(profile.data.challenges, challengeIDs);

      userProgress.progress.categories.push({
        id: categoryData.id,
        progress,
      });
    });

    const achievements = await providers.achievements.getAll();
    const achievedAchievements = profile.data.achievements.map(
      (item) => item.id
    );
    achievements.forEach((achievementData) => {
      const progress = calculateProgress(
        profile.data.challenges,
        achievementData.condition
      );

      userProgress.progress.achievements.push({
        id: achievementData.id,
        progress,
      });

      if (progress >= 1 && !achievedAchievements.includes(achievementData.id)) {
        const userAchievement = {
          id: achievementData.id,
          ...achievementData.content,
          condition: achievementData.condition,
          type: achievementData.type,
          completed: Date.now().valueOf().toString(),
        };

        profile.add(profile.data.achievements, userAchievement);
      }
    });

    profile.updateData(userProgress);

    if (isPermissionGroup(profile, 3)) {
      delete storedUserChallenge.reward;
      delete profile.data.progress;
    }

    await providers.users.update(profile.data.id, profile.data);

    delete profile.data.password;
    pubsub.publish("UserProfile", profile.data);

    if (hasNotAllPoints && isPermissionGroup(profile, 2)) {
      const leaderboard = leaderboardCreator();
      leaderboard.setName("Leaderboard");
      leaderboard.addToLeaderboard(profile, leaderboard.data.profiles);
      leaderboard.calculateTotalPoints();
      leaderboard.calculatePointsForCategory(userChallenge.data.categoryID);
      leaderboard.calculateTotalPointsForDifficulty(
        userChallenge.data.difficulty
      );

      pubsub.publish("Leaderboard", leaderboard.data);
    }

    const response = userChallenge.convertToResponseObject(userChallenge);
    if (isPermissionGroup(profile, 3)) {
      delete response.reward;
    }
    return response;
  },
};

const deleteUserChallengeQuery = {
  type: NormalResponseModel,
  args: {
    userChallengeID: { type: GraphQLString },
  },
  async resolve(_, args, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);
    if (args.userChallengeID === null) {
      throw new UserInputError("User challenge ID must have a value.");
    }

    const userChallenge = await providers.userChallenges.getByID(
      args.userChallengeID
    );
    if (userChallenge === null) {
      throw new Error("User challenge does not exist.");
    }

    await providers.userChallenges.delete(userChallenge.id);
    return {
      message: `User challenge with ID ${userChallenge.id} successfully deleted.`,
    };
  },
};

export {
  addUserChallengeQuery,
  createChallengeQuery,
  deleteUserChallengeQuery,
  getAllChallengesQuery,
};
