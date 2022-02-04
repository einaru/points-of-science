/* eslint-disable import/no-cycle */
import { GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import {
  AuthenticateTokenModel,
  authenticateAccessToken,
  authenticateRefreshToken,
  AllCategoriesResponseModel,
  config,
  categoryCreator,
  CategoryResponseModel,
  deleteData,
  checkPermissionLevel,
  deleteRefreshTokenFromDatabase,
  getData,
  getDataByFilter,
  getFilter,
  nextID,
  NormalResponseModel,
  profileState,
  SignInModel,
  signIn,
  signUp,
  updateData,
  UserModel,
  PermissionModel,
  profileCreator,
  setPermissionLevel,
  swapPermissionGroup,
} from "../../../internal.js";

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

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
    refreshToken: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const response = await authenticateRefreshToken(args.refreshToken);
      if (response.type === "error") {
        return response;
      }

      return {
        message: "Authentication successful.",
        status: 200,
        type: "success",
        data: { accessToken: response },
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
      const username = await getDataByFilter(config.env.VALID_USERNAME_TABLE, {
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

      const user = await getDataByFilter(config.env.USER_TABLE, {
        key: "username",
        value: args.username,
      })[0];
      if (user != null) {
        if (
          user.state === profileState.active.value ||
          user.state === profileState.suspended.value
        ) {
          return {
            message: "User is already active or suspended.",
            status: 400,
            type: config.env.RESPONSE_TYPE.error,
          };
        }
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

const getAllCategoriesQuery = {
  type: AllCategoriesResponseModel,
  args: {},
  async resolve(parent, args, context) {
    try {
      const categoriesData = await getData(config.env.CATEGORY_TABLE);
      let categories = [];
      categoriesData.forEach((categoryData) => {
        const category = categoryCreator();
        categories.push(category.restoreObject(category, categoryData));
      });

      const response = getResponseObject(
        "Categories retrieved successfully",
        200,
        config.env.RESPONSE_TYPE.success
      );

      categories = await Promise.all(categories);
      response.data = categories;
      return response;
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
          config.env.RESPONSE_TYPE.error
        );
      }

      const filter = getFilter({ key: "id", operator: "==", value: args.id });
      const users = await getDataByFilter(config.env.USER_TABLE, filter);
      if (users.length === 0) {
        return getResponseObject(
          "Could not find user.",
          400,
          config.RESPONSE_TYPE.error
        );
      }

      const user = profileCreator();
      user.updateData(users[0]);
      const response = await user.changePassword(
        args.password,
        args.confirmPassword
      );
      await updateData(config.env.USER_TABLE, user.data);
      return getResponseObject(response, 200, config.env.RESPONSE_TYPE.success);
    } catch (error) {
      return getResponseObject(error, 400, config.env.RESPONSE_TYPE.error);
    }
  },
};

const createCategoryQuery = {
  type: CategoryResponseModel,
  args: {
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      let response = checkPermissionLevel(
        config.env.PERMISSION_LEVELS.ADMIN,
        context.user
      );

      if (response.type === "error") {
        return response;
      }

      const categoriesData = await getData(config.env.CATEGORY_TABLE);
      const contentData = await getData(config.env.CONTENT_TABLE);
      const categoryID = nextID(categoriesData);
      const contentID = nextID(contentData);

      const category = categoryCreator();
      const newCategory = {
        id: categoryID,
      };
      category.updateData(newCategory);

      const newContent = {
        id: contentID,
        title: args.title,
        image: args.image,
        description: args.description,
      };
      category.content.updateData(newContent);
      await category.content.saveData(category.content);
      response = await category.saveData(category);
      return response;
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
  async resolve(parent, args) {
    // Put the create user logic for the BusinessLogic here.
    try {
      const users = await getData(config.env.USER_TABLE);
      const id = nextID(users);
      const newUser = {
        id,
        username: args.username,
        password: args.password,
        permission: "control",
        achievement: [],
        challenge: [],
      };
      await updateData(config.env.USER_TABLE, newUser);
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
      return {
        message: "Permission level updated successfully.",
        status: 200,
        type: config.env.RESPONSE_TYPE.success,
      };
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

      const userData = getData(config.env.USER_TABLE);
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
      return {
        message: "Swapped permission groups successfully.",
        status: 200,
        type: config.env.RESPONSE_TYPE.success,
      };
    } catch (error) {
      return error;
    }
  },
};

export {
  activateAccountQuery,
  authAccessTokenQuery,
  authRefreshTokenQuery,
  changePasswordQuery,
  createCategoryQuery,
  createUserQuery,
  deleteUserQuery,
  getAllCategoriesQuery,
  getAllUsersQuery,
  getPermissionsQuery,
  getUserByIDQuery,
  setPermissionQuery,
  signInQuery,
  signOutQuery,
  swapPermissionQuery,
  updateUserQuery,
  verifyUsernameQuery,
};
