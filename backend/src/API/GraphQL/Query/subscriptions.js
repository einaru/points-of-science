import { GraphQLString } from "graphql";
import { withFilter } from "graphql-subscriptions";
import jwt from "jsonwebtoken";
import config from "../../../Config/config.js";

import { UserModel, SwapPermissionPayload, pubsub } from "../../../internal.js";

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

const subscribeSwappedPermission = {
  type: SwapPermissionPayload,
  subscribe: () => pubsub.asyncIterator("SwapPermission"),
  resolve: (payload) => {
    return payload;
  },
};

export { subscribeSwappedPermission, subscribeUpdatedUser };
