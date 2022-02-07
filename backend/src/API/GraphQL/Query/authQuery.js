import { GraphQLString, GraphQLInt } from "graphql";
import {
  authenticateAccessToken,
  authenticateRefreshToken,
  checkPermissionLevel,
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
  AuthenticateTokenModel,
  NormalResponseModel,
  PermissionModel,
  SignInModel,
} from "../../../internal.js";
import config from "../../../Config/config.js";

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
        config.responseType.success
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
        config.permissionLevel.admin,
        context.user
      );
      if (response.type === "error") {
        return response;
      }

      return {
        message: "Permission levels retrieved successfully.",
        status: 200,
        type: config.responseType.success,
        data: config.permissionLevel,
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
        config.permissionLevel.admin,
        context.user
      );
      if (response.type === "error") {
        return response;
      }

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
      return getResponseObject(
        "Permission level updated successfully.",
        200,
        config.responseType.success
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
        config.permissionLevel.admin,
        context.user
      );
      if (response.type === "error") {
        return response;
      }

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
      return getResponseObject(
        "Swapped permission groups successfully.",
        200,
        config.responseType.success
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
