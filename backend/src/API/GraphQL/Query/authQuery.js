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
  AuthenticateTokenModel,
  NormalResponseModel,
  PermissionModel,
  SignInModel,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { AuthenticationError, ForbiddenError } from "../error.js";

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
      if (!context.user) {
        throw new AuthenticationError("User is not authorized.");
      }

      return getResponseObject(
        "Authentication successful.",
        200,
        config.responseType.success
      );
    } catch (error) {
      return error;
    }
  },
};

const getPermissionsQuery = {
  type: PermissionModel,
  args: {},
  async resolve(parent, args, context) {
    if (!context.user) {
      throw new AuthenticationError("User is not authorized.");
    }

    if (context.user.permission !== config.permissionLevel.admin) {
      throw new ForbiddenError("Admin permission is required.");
    }

    return {
      message: "Permission levels retrieved successfully.",
      status: 200,
      type: config.responseType.success,
      data: config.permissionLevel,
    };
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
  type: NormalResponseModel,
  args: { userID: { type: GraphQLString }, permission: { type: GraphQLInt } },
  async resolve(parent, args, context) {
    if (!context.user) {
      throw new AuthenticationError("User is not authorized.");
    }

    if (context.user.permission !== config.permissionLevel.admin) {
      throw new ForbiddenError("Admin permission is required.");
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
  type: NormalResponseModel,
  args: {
    refreshToken: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    if (!context.user) {
      throw new AuthenticationError("User is not authorized.");
    }
    return deleteRefreshTokenFromDatabase(args.refreshToken);
  },
};

const swapPermissionQuery = {
  type: NormalResponseModel,
  args: {},
  async resolve(parent, args, context) {
    if (!context.user) {
      throw new AuthenticationError("User is not authorized.");
    }

    if (context.user.permission !== config.permissionLevel.admin) {
      throw new ForbiddenError("Admin permission is required.");
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
