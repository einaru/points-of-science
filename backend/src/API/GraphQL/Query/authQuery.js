import { GraphQLString, GraphQLInt } from "graphql";
import {
  authenticateAccessToken,
  authenticateRefreshToken,
  config,
  checkPermissionLevel,
  deleteRefreshTokenFromDatabase,
  getData,
  getDataByFilter,
  profileCreator,
  setPermissionLevel,
  signIn,
  signUp,
  swapPermissionGroup,
  updateData,
  AuthenticateTokenModel,
  NormalResponseModel,
  PermissionModel,
  SignInModel,
} from "../../../internal.js";

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

// Root Queries - Used to retrieve data with GET-Requests

const authRefreshTokenQuery = {
  type: AuthenticateTokenModel,
  args: {
    refreshToken: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const response = await authenticateRefreshToken(args.refreshToken);
      if (response.type === "error") {
        return response;
      }

      const result = getResponseObject(
        "Authentication successful.",
        200,
        config.env.RESPONSE_TYPE.success
      );
      result.data = { accessToken: response };

      return result;
    } catch (error) {
      return error;
    }
  },
};

const authAccessTokenQuery = {
  type: NormalResponseModel,
  args: {},
  async resolve(parent, args, context) {
    try {
      return await authenticateAccessToken(context);
    } catch (error) {
      return error;
    }
  },
};

const getPermissionsQuery = {
  type: PermissionModel,
  args: {},
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const response = checkPermissionLevel(
        config.env.PERMISSION_LEVELS.ADMIN,
        context.user
      );
      if (response.type === "error") {
        return response;
      }

      return {
        message: "Permission levels retrieved successfully.",
        status: 200,
        type: config.env.RESPONSE_TYPE.success,
        data: config.env.PERMISSION_LEVELS,
      };
    } catch (error) {
      return error;
    }
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
    try {
      return await signUp(args);
    } catch (error) {
      return error;
    }
  },
};

const setPermissionQuery = {
  type: NormalResponseModel,
  args: { userID: { type: GraphQLInt }, permission: { type: GraphQLInt } },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const response = checkPermissionLevel(
        config.env.PERMISSION_LEVELS.ADMIN,
        context.user
      );
      if (response.type === "error") {
        return response;
      }

      const userData = await getDataByFilter(config.env.USER_TABLE, {
        key: "id",
        value: args.userID,
      })[0];

      const user = profileCreator();
      user.updateData(userData);
      setPermissionLevel(args.permission, user);
      await updateData(config.env.USER_TABLE, user.data);
      return getResponseObject(
        "Permission level updated successfully.",
        200,
        config.env.RESPONSE_TYPE.success
      );
    } catch (error) {
      return error;
    }
  },
};

const signInQuery = {
  type: SignInModel,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      return await signIn(args.username, args.password);
    } catch (error) {
      return error;
    }
  },
};

const signOutQuery = {
  type: NormalResponseModel,
  args: {
    refreshToken: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      return deleteRefreshTokenFromDatabase(args.refreshToken);
    } catch (error) {
      return error;
    }
  },
};

const swapPermissionQuery = {
  type: NormalResponseModel,
  args: {},
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const response = checkPermissionLevel(
        config.env.PERMISSION_LEVELS.ADMIN,
        context.user
      );
      if (response.type === "error") {
        return response;
      }

      const userData = await getData(config.env.USER_TABLE);
      const users = [];
      userData.forEach((userObject) => {
        const user = profileCreator();
        user.updateData(userObject);
        users.push(user);
      });

      swapPermissionGroup(users);
      users.forEach((user) => {
        updateData(config.env.USER_TABLE, user.data);
      });
      return getResponseObject(
        "Swapped permission groups successfully.",
        200,
        config.env.RESPONSE_TYPE.success
      );
    } catch (error) {
      return error;
    }
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
