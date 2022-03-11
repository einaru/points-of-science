/* eslint-disable import/prefer-default-export */

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const UserScore = new GraphQLObjectType({
  name: "UserScore",
  fields: () => ({
    userID: { type: GraphQLString },
    username: { type: GraphQLString },
    score: { type: GraphQLInt },
  }),
});

const Leaderboard = new GraphQLObjectType({
  name: "Leaderboard",
  fields: () => ({
    id: { type: GraphQLString },
    scores: { type: new GraphQLList(UserScore) },
  }),
});

export const LeaderboardsType = new GraphQLObjectType({
  name: "Leaderboards",
  fields: () => ({
    highScore: { type: Leaderboard },
  }),
});
