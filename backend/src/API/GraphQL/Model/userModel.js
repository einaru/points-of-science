import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";

import { AchievementModel, ChallengeModel } from "../../../internal.js";
import { ClickStreamType } from "./dataCollectionModel.js";

const UserAchievementModel = new GraphQLObjectType({
  name: "UserAchievement",
  fields: () => ({
    id: { type: GraphQLString },
    userID: { type: GraphQLString },
    achievementID: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }),
});

const UserActivityModel = new GraphQLObjectType({
  name: "UserActivity",
  fields: () => ({
    id: { type: GraphQLString },
    activityID: { type: GraphQLString },
    dateStarted: { type: GraphQLString },
    dateCompleted: { type: GraphQLString },
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

const UserReflectionModel = new GraphQLObjectType({
  name: "UserReflection",
  fields: () => ({
    id: { type: GraphQLString },
    userID: { type: GraphQLString },
    reflectionID: { type: GraphQLString },
    dateStarted: { type: GraphQLString },
    dateCompleted: { type: GraphQLString },
    answer: { type: GraphQLString },
    vote: { type: VoteEnum },
    voteChoices: { type: VoteEnum },
  }),
});

const UserRewardModel = new GraphQLObjectType({
  name: "UserReward",
  fields: () => ({
    id: { type: GraphQLString },
    userID: { type: GraphQLString },
    rewardID: { type: GraphQLString },
    points: { type: GraphQLInt },
    bonusPoints: { type: GraphQLInt },
  }),
});

const UserChallengeModel = new GraphQLObjectType({
  name: "UserChallenge",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    challengeID: { type: GraphQLString },
    userID: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    answeredCorrect: { type: GraphQLBoolean },
    activity: { type: UserActivityModel },
    reflection: { type: UserReflectionModel },
    reward: { type: UserRewardModel },
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
    challenges: { type: new GraphQLList(ChallengeModel) },
    dataCollection: { type: ClickStreamType },
  }),
});

export {
  UserAchievementModel,
  UserActivityModel,
  UserReflectionModel,
  UserRewardModel,
  UserChallengeModel,
  UserModel,
};
