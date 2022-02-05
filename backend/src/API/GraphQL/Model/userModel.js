import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";

import {
  AchievementModel,
  ChallengeModel,
  ClickStreamModel,
} from "../../../internal.js";

const UserAchievementModel = new GraphQLObjectType({
  name: "UserAchievement",
  fields: () => ({
    id: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    achievementID: { type: GraphQLInt },
    completed: { type: GraphQLBoolean },
  }),
});

const UserActivityModel = new GraphQLObjectType({
  name: "UserActivity",
  fields: () => ({
    id: { type: GraphQLInt },
    activityID: { type: GraphQLInt },
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
    id: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    reflectionID: { type: GraphQLInt },
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
    id: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    rewardID: { type: GraphQLInt },
    points: { type: GraphQLInt },
    bonusPoints: { type: GraphQLInt },
  }),
});

const UserChallengeModel = new GraphQLObjectType({
  name: "UserChallenge",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    challengeID: { type: GraphQLInt },
    userID: { type: GraphQLInt },
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
    id: { type: GraphQLInt },
    password: { type: GraphQLString },
    username: { type: GraphQLString },
    permission: { type: GraphQLString },
    achievements: { type: new GraphQLList(AchievementModel) },
    challenges: { type: new GraphQLList(ChallengeModel) },
    dataCollection: { type: ClickStreamModel },
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
