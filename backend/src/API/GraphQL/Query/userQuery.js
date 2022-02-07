import { GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import {
  authenticateAccessToken,
  deleteData,
  getData,
  getFilter,
  getDataByFilter,
  profileCreator,
  profileState,
  nextID,
  updateData,
  NormalResponseModel,
  UserModel,
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
const getAllUsersQuery = {
  type: new GraphQLList(UserModel),
  args: {},
  resolve(parent, args) {
    return getData("User");
  },
};

const getUserByIDQuery = {
  type: new GraphQLList(UserModel),
  args: { id: { type: GraphQLInt } },
  resolve(parent, args) {
    return getDataByFilter("User", {
      key: "id",
      value: args.id,
    });
  },
};

const verifyUsernameQuery = {
  type: NormalResponseModel,
  args: { username: { type: GraphQLString } },
  async resolve(parent, args) {
    try {
      const filter = getFilter({
        key: "username",
        operator: "==",
        value: args.username,
      });
      const username = await getDataByFilter(
        config.db.table.validUsername,
        filter
      );
      if (username.length === 0) {
        return {
          message: "Invalid username.",
          status: 400,
          type: config.responseType.error,
        };
      }

      const user = await getDataByFilter(config.db.table.user, filter)[0];
      if (user != null) {
        if (
          user.state === profileState.active.value ||
          user.state === profileState.suspended.value
        ) {
          return {
            message: "User is already active or suspended.",
            status: 400,
            type: config.responseType.error,
          };
        }
      }

      return {
        message: "Username is verified.",
        status: 200,
        type: config.responseType.success,
      };
    } catch (error) {
      return {
        message: `Could not verify username due to an error. Error: ${error.message}`,
        status: 400,
        type: config.responseType.error,
      };
    }
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const changePasswordQuery = {
  type: NormalResponseModel,
  args: {
    id: { type: GraphQLInt },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const userObject = context.user;
      if (userObject.id !== args.id) {
        return getResponseObject(
          "Password update not successful. Wrong user.",
          400,
          config.responseType.error
        );
      }

      const filter = getFilter({ key: "id", operator: "==", value: args.id });
      const users = await getDataByFilter(config.db.table.user, filter);
      if (users.length === 0) {
        return getResponseObject(
          "Could not find user.",
          400,
          config.responseType.error
        );
      }

      const user = profileCreator();
      user.updateData(users[0]);
      const response = await user.changePassword(
        args.password,
        args.confirmPassword
      );
      await updateData(config.db.table.user, user.data);
      return getResponseObject(response, 200, config.responseType.success);
    } catch (error) {
      return getResponseObject(error, 400, config.responseType.error);
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
  async resolve(parent, args) {
    // Put the create user logic for the BusinessLogic here.
    try {
      const users = await getData(config.db.table.user);
      const id = nextID(users);
      const newUser = {
        id,
        username: args.username,
        password: args.password,
        permission: config.permissionLevel.control,
        achievement: [],
        challenge: [],
      };
      await updateData(config.db.table.user, newUser);
      return newUser;
    } catch (error) {
      return null;
    }
  },
};

const deleteUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    try {
      // Put the delete user logic for the BusinessLogic here.
      const userList = await getDataByFilter("User", {
        key: "id",
        value: args.id,
      });
      if (userList.length > 0) {
        const user = userList[0];
        await deleteData("User", user);
        return user;
      }

      return null;
    } catch (error) {
      return error;
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
  async resolve(parent, args) {
    // Put the delete user logic for the BusinessLogic here.
    try {
      const userList = await getDataByFilter("User", {
        key: "id",
        value: args.id,
      });
      if (userList.length === 0) {
        return null;
      }

      const user = userList[0];
      user.username = args.username;
      updateData("User", user);
      return user;
    } catch (error) {
      return error;
    }
  },
};

export {
  changePasswordQuery,
  createUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserByIDQuery,
  updateUserQuery,
  verifyUsernameQuery,
};