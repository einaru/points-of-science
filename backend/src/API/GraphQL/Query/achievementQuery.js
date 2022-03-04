import { GraphQLList } from "graphql";
import {
  AchievementModel,
  AchievementInputModel,
  achievementCreator,
} from "../../../internal.js";
import {
  assertIsAdmin,
  assertHasExperimentPermission,
  assertIsAuthenticated,
} from "../assert.js";

// Root Queries - Used to retrieve data with GET-Requests

const getAllAchievementsQuery = {
  type: new GraphQLList(AchievementModel),
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    assertHasExperimentPermission(user);

    const achievements = await providers.achievements.getAll();

    const result = [];
    achievements.forEach((achievementData) => {
      const achievement = achievementCreator();
      achievement.data.id = achievementData.id;
      achievement.setType(achievementData.type);
      achievement.addCondition(achievementData.condition);
      achievement.content.updateData(achievementData.content);
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

export {
  createAchievementQuery,
  getAllAchievementsQuery,
};
