import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import {
  ContentModel,
  ContentResponse,
  ReflectionModel,
  ResponseModel,
  UserModel,
} from "../../../internal.js";

const RewardModel = new GraphQLObjectType({
  name: "Reward",
  fields: () => ({
    id: { type: GraphQLString },
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

const ChallengeModel = new GraphQLObjectType({
  name: "Challenge",
  fields: () => ({
    id: { type: GraphQLString },
    categoryID: { type: GraphQLString },
    difficulty: { type: DifficultyEnum },
    ...ContentResponse,
    // activity: { type: ActivityModel },
    reflection: { type: ReflectionModel },
    reward: { type: RewardModel },
  }),
});

const ChallengeResponseModel = new GraphQLObjectType({
  name: "ChallengeResponse",
  fields: () => ({
    ...ResponseModel,
    data: { type: ChallengeModel },
  }),
});

const AllChallengesResponseModel = new GraphQLObjectType({
  name: "AllChallengesResponse",
  fields: () => ({
    ...ResponseModel,
    data: { type: new GraphQLList(ChallengeModel) },
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
    condition: { type: new GraphQLList(ChallengeModel) },
    type: { type: AchievementTypeEnum },
    content: { type: ContentModel },
  }),
});

const ProgressModel = new GraphQLObjectType({
  name: "Progress",
  fields: () => ({
    id: { type: GraphQLString },
    percentage: { type: GraphQLInt },
  }),
});

const LeaderboardModel = new GraphQLObjectType({
  name: "Leaderboard",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    leaderboard: { type: new GraphQLList(UserModel) },
  }),
});

export {
  AllChallengesResponseModel,
  AchievementModel,
  RewardModel,
  ProgressModel,
  LeaderboardModel,
  ChallengeModel,
  ChallengeResponseModel,
};
