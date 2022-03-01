import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";

import { AchievementModel, ChallengeModel } from "../../../internal.js";

const UserAchievementModel = new GraphQLObjectType({
  name: "UserAchievement",
  fields: () => ({
    id: { type: GraphQLString },
    userID: { type: GraphQLString },
    achievementID: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }),
});

const UserActivityInputModel = new GraphQLInputObjectType({
  name: "UserActivity",
  fields: () => ({
    hasOpenHints: { type: GraphQLBoolean },
    hasOpenResources: { type: GraphQLBoolean },
    dateStarted: { type: GraphQLString },
    answer: { type: GraphQLString },
  }),
});

const VoteEnum = new GraphQLEnumType({
  name: "Vote",
  values: {
    neutral: { value: -1 },
    up: { value: 1 },
    down: { value: 2 },
  },
});

const UserReflectionInputModel = new GraphQLInputObjectType({
  name: "UserReflection",
  fields: () => ({
    dateCompleted: { type: GraphQLString },
    answer: { type: GraphQLString },
  }),
});

const UserChallengeInputModel = new GraphQLInputObjectType({
  name: "UserChallengeInput",
  fields: () => ({
    challengeID: { type: GraphQLString },
    activity: { type: UserActivityInputModel },
    reflection: { type: UserReflectionInputModel },
  }),
});

const UserChallengeModel = new GraphQLObjectType({
  name: "UserChallenge",
  fields: () => ({
    challengeID: { type: GraphQLString },
    answeredCorrect: { type: GraphQLBoolean },
  }),
});

const UserModel = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    password: { type: GraphQLString },
    username: { type: GraphQLString },
    permission: { type: GraphQLString },
    achievements: { type: new GraphQLList(AchievementModel) },
    challenges: { type: new GraphQLList(UserChallengeModel) },
  }),
});

export { UserAchievementModel, UserChallengeInputModel, UserModel };
