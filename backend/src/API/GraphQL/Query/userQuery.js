import { GraphQLString, GraphQLList } from "graphql";
import {
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
import { assertIsAuthenticated } from "../assert.js";
import { UserInputError } from "../error.js";

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
  args: { id: { type: GraphQLString } },
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
      throw new UserInputError("Invalid username.");
    }

    const user = await getDataByFilter(config.db.table.user, filter)[0];
    if (user != null) {
      if (
        user.state === profileState.active.value ||
        user.state === profileState.suspended.value
      ) {
        throw new UserInputError("User is already active or suspended.");
      }
    }

    return {
      message: "Username is verified.",
      status: 200,
      type: config.responseType.success,
    };
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const changePasswordQuery = {
  type: NormalResponseModel,
  args: {
    id: { type: GraphQLString },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);

    const userObject = context.user;
    if (userObject.id !== args.id) {
      throw new UserInputError("Password update not successful. Wrong user.");
    }

    const filter = getFilter({ key: "id", operator: "==", value: args.id });
    const users = await getDataByFilter(config.db.table.user, filter);
    if (users.length === 0) {
      throw new UserInputError("Could not find user.");
    }

    const user = profileCreator();
    user.updateData(users[0]);
    const response = await user.changePassword(
      args.password,
      args.confirmPassword
    );
    await updateData(config.db.table.user, user.data);
    return getResponseObject(response, 200, config.responseType.success);
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
    const id = nextID(config.db.table.user);
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
  },
};

const deleteUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent, args) {
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
  },
};

const updateUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const filter = getFilter({
      key: "id",
      operator: "==",
      value: args.id,
    });
    const userList = await getDataByFilter("User", filter);
    if (userList.length === 0) {
      return null;
    }

    const user = userList[0];
    user.username = args.username;
    await updateData(config.db.table.user, user);
    return user;
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
