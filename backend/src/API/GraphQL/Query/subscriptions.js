import { GraphQLString } from "graphql";
import { withFilter } from "graphql-subscriptions";
import jwt from "jsonwebtoken";
import config from "../../../Config/config.js";

import {
  NormalResponseModel,
  UserModel,
  SwapPermissionPayload,
  pubsub,
} from "../../../internal.js";
import { LeaderboardsType } from "../Model/leaderboardModel.js";

export const subscribeUpdatedUser = {
  type: UserModel,
  args: { subscribeToken: { type: GraphQLString } },
  subscribe: withFilter(
    () => pubsub.asyncIterator("UserProfile"),
    (payload, variables) => {
      const verifiedUser = jwt.verify(
        variables.subscribeToken,
        config.secret.subscribeToken
      );

      return payload.id === verifiedUser.id;
    }
  ),
  resolve: (payload) => {
    return payload;
  },
};

export const subscribeLeaderboards = {
  type: LeaderboardsType,
  args: { subscribeToken: { type: GraphQLString } },
  subscribe: withFilter(
    () => pubsub.asyncIterator("Leaderboards"),
    (_, variables) => {
      const verifiedUser = jwt.verify(
        variables.subscribeToken,
        config.secret.subscribeToken
      );

      return verifiedUser.permission === 2;
    }
  ),
  resolve: (payload) => {
    return payload;
  },
};

export const subscribeUpdatePermission = {
  type: SwapPermissionPayload,
  args: { subscribeToken: { type: GraphQLString } },
  subscribe: withFilter(
    () => pubsub.asyncIterator("UpdatePermission"),
    (_, variables) => {
      const verifiedUser = jwt.verify(
        variables.subscribeToken,
        config.secret.subscribeToken
      );

      return verifiedUser.id === variables.id;
    }
  ),
  resolve: (payload) => {
    return payload;
  },
};

export const subscribeSwappedPermission = {
  type: NormalResponseModel,
  args: { subscribeToken: { type: GraphQLString } },
  subscribe: withFilter(
    () => pubsub.asyncIterator("SwapPermission"),
    (_, variables) => {
      const verifiedUser = jwt.verify(
        variables.subscribeToken,
        config.secret.subscribeToken
      );

      return verifiedUser != null && verifiedUser === Object(verifiedUser);
    }
  ),
  resolve: (payload) => {
    return payload;
  },
};
