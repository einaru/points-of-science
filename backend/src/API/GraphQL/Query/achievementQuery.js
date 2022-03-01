import { GraphQLList, GraphQLString } from "graphql";
import {
  AchievementModel,
  AchievementInputModel,
  UserAchievementModel,
  achievementCreator,
  profileCreator,
} from "../../../internal.js";
import {
  assertIsAdmin,
  assertIsExperimental,
  assertIsAuthenticated,
} from "../assert.js";

// Root Queries - Used to retrieve data with GET-Requests

const getAllAchievementsQuery = {
  type: new GraphQLList(AchievementModel),
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsExperimental(user);

    const userData = await providers.users.getByID(user.id);
    const achievements = await providers.achievements.getAll();

    const result = [];
    achievements.forEach((achievementData) => {
      const achievement = achievementCreator();
      achievement.data.id = achievementData.id;
      achievement.setType(achievementData.type);
      achievement.addCondition(achievementData.condition);
      achievement.content.updateData(achievementData.content);
      const progress = achievement.progress.calculateProgress(
        userData.challenges,
        achievement.data.condition
      );
      achievement.progress.setProgress(progress);
      result.push(achievement.convertToResponseObject(achievement));
    });

    return result;
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests

const createAchievementQuery = {
  type: AchievementModel,
  args: {
    achievement: { type: AchievementInputModel },
  },
  async resolve(_, args, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);

    const achievement = achievementCreator();

    const content = {
      title: args.achievement.name,
      image: args.achievement.image,
      description: args.achievement.description,
    };

    achievement.content.updateData(content);
    achievement.setType(args.achievement.type);
    achievement.addCondition(args.achievement.condition);
    const storedAchievement = achievement.convertToStoredObject(achievement);
    const object = await providers.achievements.add(storedAchievement);
    achievement.data.id = object.id;
    return achievement.convertToResponseObject(achievement);
  },
};

const addUserAchievementQuery = {
  type: new GraphQLList(UserAchievementModel),
  args: {
    achievementIDs: { type: new GraphQLList(GraphQLString) },
  },
  async resolve(_, args, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsExperimental(user);

    const userData = await providers.users.getByID(user.id);
    const profile = profileCreator();
    profile.updateData(userData);

    const achievements = await providers.achievements.getAll();

    const userAchievements = [];
    args.achievementIDs.forEach((achievementID) => {
      const achievementData = achievements.find(
        (achievement) => achievement.id === achievementID
      );

      if (achievementData != null) {
        const achievement = achievementCreator();
        achievement.content.updateData(achievementData.content);
        achievement.setType(achievementData.type);
        achievement.addCondition(achievementData.condition);
        const progress = achievement.progress.calculateProgress(
          userData.challenges,
          achievement.data.condition
        );
        achievement.progress.setProgress(progress);
        if (progress >= 1) {
          const userAchievement = {
            id: achievementData.id,
            content: achievement.content,
            condition: achievement.data.condition,
            type: achievement.data.type,
            completed: Date.now().valueOf().toString(),
          };
          profile.add(profile.data.achievements, userAchievement);
          const { title, image, description } = achievement.content.data;
          delete userAchievement.content;
          const response = {
            ...userAchievement,
            name: title,
            image,
            description,
          };
          userAchievements.push(response);
        }
      }
    });

    await providers.users.update(user.id, profile.data);
    return userAchievements;
  },
};

export {
  addUserAchievementQuery,
  createAchievementQuery,
  getAllAchievementsQuery,
};
