/* eslint-disable import/prefer-default-export */

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const HighScore = new GraphQLObjectType({
  name: "HighScore",
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
    scores: { type: new GraphQLList(HighScore) },
  }),
});

export const LeaderboardsType = new GraphQLObjectType({
  name: "Leaderboards",
  fields: () => ({
    highScores: { type: Leaderboard },
  }),
});
