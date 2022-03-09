import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";
import {
  ContentResponse,
  ReflectionModel,
  ReflectionTypeEnum,
} from "../../../internal.js";
import { ActivityModel } from "./contentModel.js";

const RewardModel = new GraphQLObjectType({
  name: "Reward",
  fields: () => ({
    id: { type: GraphQLString },
    maxPoints: { type: GraphQLInt },
    firstTryPoints: { type: GraphQLInt },
    bonusPoints: { type: GraphQLInt },
  }),
});

const RewardInputModel = new GraphQLInputObjectType({
  name: "RewardInput",
  fields: () => ({
    maxPoints: { type: GraphQLInt },
    firstTryPoints: { type: GraphQLInt },
    bonusPoints: { type: GraphQLInt },
  }),
});

const DifficultyEnum = new GraphQLEnumType({
  name: "Difficulty",
  values: {
    beginner: { value: 1 },
    intermediate: { value: 2 },
    expert: { value: 3 },
  },
});

const CategoryLightweightModel = new GraphQLObjectType({
  name: "CategoryLightweightModel",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const challengeData = {
  id: { type: GraphQLString },
  category: { type: CategoryLightweightModel },
  difficulty: { type: DifficultyEnum },
  ...ContentResponse,
  activity: { type: ActivityModel },
  reflectionType: { type: ReflectionTypeEnum },
  reflection: { type: ReflectionModel },
  reward: { type: RewardModel },
};

const ChallengeModel = new GraphQLObjectType({
  name: "Challenge",
  fields: () => ({
    ...challengeData,
  }),
});

const ChallengeInputModel = new GraphQLInputObjectType({
  name: "ChallengeInput",
  fields: () => ({
    categoryID: { type: GraphQLString },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: DifficultyEnum },
  }),
});

const ChallengeResponseModel = new GraphQLObjectType({
  name: "ChallengeResponse",
  fields: () => ({
    ...challengeData,
  }),
});

const ProgressModel = new GraphQLObjectType({
  name: "Progress",
  fields: () => ({
    percentage: { type: GraphQLFloat },
  }),
});

const AchievementTypeEnum = new GraphQLEnumType({
  name: "AchievementType",
  values: {
    category: { value: 1 },
    challenge: { value: 2 },
  },
});

const AchievementModel = new GraphQLObjectType({
  name: "Achievement",
  fields: () => ({
    id: { type: GraphQLString },
    condition: { type: new GraphQLList(GraphQLString) },
    type: { type: AchievementTypeEnum },
    ...ContentResponse,
  }),
});

const AchievementInputModel = new GraphQLInputObjectType({
  name: "AchievementInput",
  fields: () => ({
    condition: { type: new GraphQLList(GraphQLString) },
    type: { type: AchievementTypeEnum },
    ...ContentResponse,
  }),
});

const HighScore = new GraphQLObjectType({
  name: "HighScore",
  fields: () => ({
    rank: { type: GraphQLInt },
    username: { type: GraphQLString },
    score: { type: GraphQLInt },
  }),
});

const CategoryHighScores = new GraphQLObjectType({
  name: "CategoryHighScores",
  fields: () => ({
    categoryID: { type: GraphQLString },
    categoryName: { type: GraphQLString },
    highScores: { type: new GraphQLList(HighScore) },
  }),
});

const DifficultyHighScores = new GraphQLObjectType({
  name: "DifficultyHighScores",
  fields: () => ({
    difficulty: { type: DifficultyEnum },
    highScores: { type: new GraphQLList(HighScore) },
  }),
});

const LeaderboardsType = new GraphQLObjectType({
  name: "Leaderboards",
  fields: () => ({
    highScores: { type: new GraphQLList(HighScore) },
    categories: { type: new GraphQLList(CategoryHighScores) },
    difficulties: { type: new GraphQLList(DifficultyHighScores) },
  }),
});

export {
  AchievementModel,
  AchievementInputModel,
  AchievementTypeEnum,
  ChallengeInputModel,
  RewardModel,
  RewardInputModel,
  ProgressModel,
  LeaderboardsType,
  ChallengeModel,
  ChallengeResponseModel,
};
