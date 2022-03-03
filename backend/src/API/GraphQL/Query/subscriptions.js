import {
  UserModel,
  SwapPermissionPayload,
  pubsub,
} from "../../../internal.js";

const subscribeUpdatedUser = {
  type: UserModel,
  subscribe: () => pubsub.asyncIterator("UserProfile"),
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
