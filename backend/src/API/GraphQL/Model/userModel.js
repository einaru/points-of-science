import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
} from "graphql";

import {
  AchievementTypeEnum,
  ContentResponse,
  PermissionEnum,
} from "../../../internal.js";

const UserAchievementModel = new GraphQLObjectType({
  name: "UserAchievement",
  fields: () => ({
    id: { type: GraphQLString },
    ...ContentResponse,
    condition: { type: new GraphQLList(GraphQLString) },
    type: { type: AchievementTypeEnum },
    completed: { type: GraphQLString },
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

const UserRewardModel = new GraphQLObjectType({
  name: "UserReward",
  fields: () => ({
    points: { type: GraphQLInt },
    bonusPoints: { type: GraphQLInt },
  }),
});

const userChallengeRating = {
  label: { type: GraphQLString },
  score: { type: GraphQLInt },
};

const UserChallengeRatingType = new GraphQLObjectType({
  name: "UserChallengeRating",
  fields: () => ({
    ...userChallengeRating,
  }),
});

const UserChallengeRatingInputType = new GraphQLInputObjectType({
  name: "UserChallengeRatingInput",
  fields: () => ({
    challengeID: { type: GraphQLString },
    dateCompleted: { type: GraphQLString },
    ...userChallengeRating,
  }),
});

const UserChallengeModel = new GraphQLObjectType({
  name: "UserChallenge",
  fields: () => ({
    challengeID: { type: GraphQLString },
    answeredCorrect: { type: GraphQLBoolean },
    completed: { type: GraphQLString },
    reward: { type: UserRewardModel },
    rating: { type: UserChallengeRatingType },
  }),
});

const UserCategoriesProgress = new GraphQLObjectType({
  name: "UserCategoriesProgress",
  fields: () => ({
    id: { type: GraphQLString },
    progress: { type: GraphQLFloat },
  }),
});

const UserAchievementProgress = new GraphQLObjectType({
  name: "UserAchievementProgress",
  fields: () => ({
    id: { type: GraphQLString },
    progress: { type: GraphQLFloat },
  }),
});

const UserProgressModel = new GraphQLObjectType({
  name: "UserProgress",
  fields: () => ({
    categories: { type: new GraphQLList(UserCategoriesProgress) },
    achievements: { type: new GraphQLList(UserAchievementProgress) },
  }),
});

const UserModel = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    permission: { type: PermissionEnum },
    achievements: { type: new GraphQLList(UserAchievementModel) },
    challenges: { type: new GraphQLList(UserChallengeModel) },
    progress: { type: UserProgressModel },
  }),
});

export {
  UserAchievementModel,
  UserChallengeInputModel,
  UserChallengeModel,
  UserChallengeRatingInputType,
  UserModel,
};
