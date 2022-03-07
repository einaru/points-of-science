import { GraphQLString } from "graphql";
import { withFilter } from "graphql-subscriptions";
import jwt from "jsonwebtoken";
import config from "../../../Config/config.js";

import {
  LeaderboardType,
  NormalResponseModel,
  UserModel,
  SwapPermissionPayload,
  pubsub,
} from "../../../internal.js";

const subscribeUpdatedUser = {
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

const subscribeLeaderboard = {
  type: LeaderboardType,
  args: { subscribeToken: { type: GraphQLString } },
  subscribe: withFilter(
    () => pubsub.asyncIterator("Leaderboard"),
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

const subscribeUpdatePermission = {
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

const subscribeSwappedPermission = {
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

export {
  subscribeLeaderboard,
  subscribeSwappedPermission,
  subscribeUpdatePermission,
  subscribeUpdatedUser,
};
