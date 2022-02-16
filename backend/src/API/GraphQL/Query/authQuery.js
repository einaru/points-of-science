import { GraphQLString, GraphQLInt } from "graphql";
import {
  authenticateRefreshToken,
  deleteRefreshTokenFromDatabase,
  getData,
  getDataByFilter,
  getFilter,
  profileCreator,
  setPermissionLevel,
  signIn,
  signUp,
  swapPermissionGroup,
  updateData,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";
import {
  AccessTokenModel,
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
  async resolve(parent, args) {
    const accessToken = await authenticateRefreshToken(args.refreshToken);
    return { accessToken };
  },
};

const authAccessTokenQuery = {
  type: MessageResponseModel,
  args: {},
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    return { message: "Authentication successful." };
  },
};

const getPermissionsQuery = {
  type: PermissionModel,
  args: {},
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);
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
  async resolve(parent, args) {
    return signUp(args);
  },
};

const setPermissionQuery = {
  type: MessageResponseModel,
  args: { userID: { type: GraphQLString }, permission: { type: GraphQLInt } },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);

    const filter = getFilter({
      key: "id",
      operator: "==",
      value: args.userID,
    });
    const userData = await getDataByFilter(config.db.table.user, filter)[0];

    const user = profileCreator();
    user.updateData(userData);
    setPermissionLevel(args.permission, user);
    await updateData(config.db.table.user, user.data);
    return { message: "Permission level updated successfully." };
  },
};

const signInQuery = {
  type: SignInModel,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    return signIn(args.username, args.password);
  },
};

const signOutQuery = {
  type: MessageResponseModel,
  args: {
    refreshToken: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    return deleteRefreshTokenFromDatabase(args.refreshToken);
  },
};

const swapPermissionQuery = {
  type: MessageResponseModel,
  args: {},
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);

    const userData = await getData(config.db.table.user);
    const users = [];
    userData.forEach((userObject) => {
      const user = profileCreator();
      user.updateData(userObject);
      users.push(user);
    });

    swapPermissionGroup(users);
    users.forEach((user) => {
      updateData(config.db.table.user, user.data);
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
