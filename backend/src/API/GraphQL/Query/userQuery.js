import { GraphQLString, GraphQLList } from "graphql";
import {
  profileCreator,
  profileState,
  UserModel,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { assertIsAuthenticated } from "../assert.js";
import { UserInputError } from "../error.js";
import { NormalResponseModel } from "../Model/model.js";

// Root Queries - Used to retrieve data with GET-Requests
const getAllUsersQuery = {
  type: new GraphQLList(UserModel),
  args: {},
  resolve(_, __, { providers }) {
    return providers.users.getAll();
  },
};

const getUserByIDQuery = {
  type: new GraphQLList(UserModel),
  args: { id: { type: GraphQLString } },
  resolve(_, args, { providers }) {
    return providers.users.getByID(args.id);
  },
};

const verifyUsernameQuery = {
  type: NormalResponseModel,
  args: { username: { type: GraphQLString } },
  async resolve(_, args, { providers }) {
    const validUsernames = await providers.validUsernames.getAll();
    const username = validUsernames.filter((object) => {
      return object.username === args.username;
    })[0];
    if (username == null) {
      throw new UserInputError("Invalid username.");
    }

    const users = await providers.users.getAll();
    const user = users.filter((object) => {
      return object.username === args.username;
    })[0];
    if (user != null) {
      if (
        user.state === profileState.active.value ||
        user.state === profileState.suspended.value
      ) {
        throw new UserInputError("User is already active or suspended.");
      }
    }

    return { message: "Username is verified." };
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const changePasswordQuery = {
  type: NormalResponseModel,
  args: {
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
  },
  async resolve(_, args, { user, providers }) {
    assertIsAuthenticated(user);

    const users = await providers.users.getByID(user.id);
    if (users == null) {
      throw new UserInputError("Could not find user.");
    }

    const userProfile = profileCreator();
    userProfile.updateData(users);
    const message = await userProfile.changePassword(
      args.password,
      args.confirmPassword
    );
    await providers.users.update(userProfile.data.id, userProfile.data);
    return { message };
  },
};

const createUserQuery = {
  type: UserModel,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  async resolve(_, args, { providers }) {
    const newUser = {
      username: args.username,
      password: args.password,
      permission: config.permissionLevel.control,
      achievement: [],
      challenge: [],
    };
    const user = await providers.users.add(newUser);
    return user;
  },
};

const deleteUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(_, args, { providers }) {
    const userList = await providers.users.getByID(args.id);

    if (userList.length > 0) {
      const user = userList[0];
      await providers.users.delete(args.id);
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
  async resolve(_, args, { providers }) {
    const userList = await providers.users.getByID(args.id);
    if (userList.length === 0) {
      return null;
    }

    const user = userList[0];
    user.username = args.username;
    await providers.users.update(user);
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
