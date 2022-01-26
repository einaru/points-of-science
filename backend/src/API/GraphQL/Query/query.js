import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import {
  AuthenticateTokenModel,
  authenticateAccessToken,
  authenticateRefreshToken,
  config,
  deleteRefreshTokenFromDatabase,
  UserModel,
  NormalResponseModel,
  SignInModel,
  getData,
  getDataByFilter,
  updateData,
  deleteData,
  nextID,
  signIn,
  signUp,
} from "../../../internal.js";

// Root Queries - Used to retrieve data with GET-Requests
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

const authRefreshTokenQuery = {
  type: AuthenticateTokenModel,
  args: {
    refresh_token: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const response = await authenticateRefreshToken(args.refresh_token);
      if (response.type === "error") {
        return response;
      }

      return {
        message: "Authentication successful.",
        status: 200,
        type: "success",
        data: { access_token: response },
      };
    } catch (error) {
      return error;
    }
  },
};

const getAllUsersQuery = {
  type: new GraphQLList(UserModel),
  args: {},
  resolve(parent, args) {
    return getData("User");
  },
};

const getUserByIDQuery = {
  type: new GraphQLList(UserModel),
  args: { id: { type: GraphQLInt }, permission: { type: GraphQLString } },
  resolve(parent, args) {
    return getDataByFilter("User", {
      key: "permission",
      value: args.permission,
    });
  },
};

const verifyUsernameQuery = {
  type: NormalResponseModel,
  args: { username: { type: GraphQLString } },
  resolve(parent, args) {
    try {
      const username = getDataByFilter(config.env.VALID_USERNAME_TABLE, {
        key: "username",
        value: args.username,
      });
      if (username.length === 0) {
        return {
          message: "Invalid username.",
          status: 400,
          type: config.env.RESPONSE_TYPE.error,
        };
      }

      return {
        message: "Username is verified.",
        status: 200,
        type: config.env.RESPONSE_TYPE.success,
      };
    } catch (error) {
      return {
        message: `Could not verify username due to an error. Error: ${error.message}`,
        status: 400,
        type: config.env.RESPONSE_TYPE.error,
      };
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

const createUserQuery = {
  type: UserModel,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  resolve(parent, args) {
    // Put the create user logic for the BusinessLogic here.
    const newUser = {
      id: nextID("User"),
      username: args.username,
      password: args.password,
      permission: "control",
      achievement: [],
      challenge: [],
    };
    updateData("User", newUser);
    return newUser;
  },
};

const deleteUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    // Put the delete user logic for the BusinessLogic here.
    const userList = getDataByFilter("User", { key: "id", value: args.id });
    if (userList.length > 0) {
      const user = userList[0];
      deleteData("User", user);
      return user;
    }
  },
};

const updateUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  resolve(parent, args) {
    // Put the delete user logic for the BusinessLogic here.
    const userList = getDataByFilter("User", { key: "id", value: args.id });
    if (userList.length > 0) {
      const user = userList[0];
      user.username = args.username;
      updateData("User", user);
      return user;
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
    refresh_token: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      return deleteRefreshTokenFromDatabase(args.refresh_token);
    } catch (error) {
      return error;
    }
  },
};

export {
  activateAccountQuery,
  authAccessTokenQuery,
  authRefreshTokenQuery,
  createUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserByIDQuery,
  signInQuery,
  signOutQuery,
  updateUserQuery,
  verifyUsernameQuery,
};
