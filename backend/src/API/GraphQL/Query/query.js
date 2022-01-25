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
} from "../../../internal.js";

//Root Queries - Used to retrieve data with GET-Requests
const authAccessTokenQuery = {
  type: NormalResponseModel,
  args: {},
  async resolve(parent, args, context) {
    try{
      return await authenticateAccessToken(context);
    } catch(error){
      return error;
    }
  }
};

const authRefreshTokenQuery = {
  type: AuthenticateTokenModel,
  args: {
    refresh_token: { type: GraphQLString }
  },
  async resolve(parent, args) {
    try{
      const response = await authenticateRefreshToken(args.refresh_token);
      if(response.type == 'error'){
        return response;
      }

      return { message: "Authentication successful.", status: 200, type: 'success', data: { access_token: response }};
    } catch(error){
      return error;
    }
  }
};

const getAllUsersQuery = {
  type: new GraphQLList(UserModel),
  args: {},
  resolve(parent, args) {
    return getData("User");
  }
};

const getUserByIDQuery = {
  type: new GraphQLList(UserModel),
  args: { id: { type: GraphQLInt }, permission: { type: GraphQLString } },
  resolve(parent, args) {
    return getDataByFilter("User", {
      key: "permission",
      value: args.permission,
    });
  }
};

//Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const createUserQuery = {
  type: UserModel,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  resolve(parent, args) {
    //Put the create user logic for the BusinessLogic here.
    const newUser = {
      id: nextID("User"),
      name: args.name,
      password: args.password,
      permission: "control",
      achievement: [],
      challenge: [],
    };
    updateData("User", newUser);
    return newUser;
  }
};

const deleteUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    //Put the delete user logic for the BusinessLogic here.
    const userList = getDataByFilter("User", { key: "id", value: args.id });
    if (userList.length > 0) {
      let user = userList[0];
      deleteData("User", user);
      return user;
    }

    return;
  }
};

const updateUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  resolve(parent, args) {
    //Put the delete user logic for the BusinessLogic here.
    let userList = getDataByFilter("User", { key: "id", value: args.id });
    if (userList.length > 0) {
      let user = userList[0];
      user.name = args.name;
      updateData("User", user);
      return user;
    }

    return;
  }
};

const signInQuery = {
  type: SignInModel,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      return await signIn(args.name, args.password);
    } catch (error) {
      return error;
    }
  }
};

const signOutQuery = {
  type: NormalResponseModel,
  args: {
    refresh_token: { type: GraphQLString }
  },
  async resolve(parent, args, context){
    try{
      authenticateAccessToken(context);
      return deleteRefreshTokenFromDatabase(args.refresh_token);
    } catch(error){
      return error;
    }
  }
}

export {
  authAccessTokenQuery,
  authRefreshTokenQuery,
  createUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserByIDQuery,
  signInQuery,
  signOutQuery,
  updateUserQuery,
};
