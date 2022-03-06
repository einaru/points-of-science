import { GraphQLString } from "graphql";
import {
  authenticateRefreshToken,
  initializeProgress,
  profileCreator,
  setPermissionLevel,
  signIn,
  signUp,
  swapPermissionGroup,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";
import {
  AccessTokenModel,
  PermissionInputModel,
  PermissionModel,
  SignInModel,
  MessageResponseModel,
} from "../Model/authModel.js";

// Root Queries - Used to retrieve data with GET-Requests

const authRefreshTokenQuery = {
  type: AccessTokenModel,
  args: {
    refreshToken: { type: GraphQLString },
  },
  async resolve(_, args, { providers }) {
    const refreshTokens = await providers.refreshTokens.getAll();
    const accessToken = await authenticateRefreshToken(
      args.refreshToken,
      refreshTokens
    );

    return { accessToken };
  },
};

const authAccessTokenQuery = {
  type: MessageResponseModel,
  args: {},
  async resolve(_, __, { user }) {
    assertIsAuthenticated(user);
    return { message: "Authentication successful." };
  },
};

const getPermissionsQuery = {
  type: PermissionModel,
  args: {},
  async resolve(_, __, { user }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);
    return config.permissionLevel;
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const activateAccountQuery = {
  type: SignInModel,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
  },
  async resolve(_, args, { providers }) {
    const validUsernames = await providers.validUsernames.getAll();
    const users = await providers.users.getAll();

    const validUsername = validUsernames.filter((object) => {
      return object.username === args.username;
    })[0];

    let user = users.filter((object) => {
      return object.username === args.username;
    })[0];

    user = await signUp(args, validUsername, user);
    user = await initializeProgress(user, providers);
    if (user.data.id.trim().length === 0) {
      await providers.users.add(user.data);
    } else {
      await providers.users.update(user.data.id, user.data);
    }

    return signIn(args.password, user.data, providers);
  },
};

const setPermissionQuery = {
  type: MessageResponseModel,
  args: {
    permission: { type: PermissionInputModel },
  },
  async resolve(_, args, { user, providers, pubsub }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);

    const users = await providers.users.getAll();
    const userData = users.filter((object) => {
      return object.id === args.permission.userID;
    })[0];

    const userProfile = profileCreator();
    userProfile.updateData(userData);
    setPermissionLevel(args.permission.permission, userProfile);
    await providers.users.update(userProfile.data.id, userProfile.data);

    pubsub.publish("SwapPermission", {
      id: userProfile.data.id,
      permission: userProfile.data.permission,
    });

    return { message: "Permission level updated successfully." };
  },
};

const signInQuery = {
  type: SignInModel,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args, { providers }) {
    const users = await providers.users.getAll();
    const user = users.filter((object) => object.username === args.username)[0];

    if (user == null) {
      throw new Error("User not found. Sign in unsuccessful.");
    }

    return signIn(args.password, user, providers);
  },
};

const signOutQuery = {
  type: MessageResponseModel,
  args: {
    refreshToken: { type: GraphQLString },
  },
  async resolve(_, args, { user, providers }) {
    assertIsAuthenticated(user);
    const refreshTokens = await providers.refreshTokens.getAll();

    if (refreshTokens.length === 0) {
      throw new Error("User is already signed out.");
    }

    await providers.refreshTokens.delete(args.refreshToken);
    return { message: "User signed out successfully." };
  },
};

const swapPermissionQuery = {
  type: MessageResponseModel,
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    assertIsAdmin(user);

    const userData = await providers.users.getAll();
    const users = [];
    userData.forEach((userObject) => {
      const userProfile = profileCreator();
      userProfile.updateData(userObject);
      users.push(userProfile);
    });

    swapPermissionGroup(users);
    users.forEach((userObject) => {
      providers.users.update(userObject.data.id, userObject.data);
    });
    return { message: "Swapped permission groups successfully." };
  },
};

export {
  activateAccountQuery,
  authAccessTokenQuery,
  authRefreshTokenQuery,
  getPermissionsQuery,
  setPermissionQuery,
  signInQuery,
  signOutQuery,
  swapPermissionQuery,
};
