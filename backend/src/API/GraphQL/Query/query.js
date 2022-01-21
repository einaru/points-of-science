import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { UserModel, SignInModel, getData, getDataByFilter, updateData, deleteData, nextID, signIn } from '../../../internal.js';


//Root Queries - Used to retrieve data with GET-Requests
const getAllUsersQuery = {
  type: new GraphQLList(UserModel),
  args: {},
  resolve(parent, args) {
    return getData('User');
  }
};

const getUserByIDQuery = {
  type: new GraphQLList(UserModel),
  args: { id: { type: GraphQLInt }, permission: { type: GraphQLString } },
  resolve(parent, args){
    return getDataByFilter('User', { key: 'permission', value: args.permission });
  }
}


//Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const createUserQuery = {
  type: UserModel,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString }
  },
  resolve(parent, args){
    //Put the create user logic for the BusinessLogic here.
    const newUser = {
      "id": nextID('User'),
      "name": args.name,
      "password": args.password,
      "permission": "control",
      "achievement": [],
      "challenge": [] }
    updateData('User', newUser);
    return newUser;
  }
};

const deleteUserQuery = {
  type: UserModel,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent, args){
    //Put the delete user logic for the BusinessLogic here.
    const userList = getDataByFilter('User', { key: 'id', value: args.id })
    if(userList.length > 0){
      let user = userList[0];
      console.log(user);
      deleteData('User', user);
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
    confirm_password: { type: GraphQLString }
  },
  resolve(parent, args){
    //Put the delete user logic for the BusinessLogic here.
    let userList = getDataByFilter('User', { key: 'id', value: args.id });
    if(userList.length > 0){
      let user = userList[0];
      user.name = args.name;
      updateData('User', user);
      return user;
    }

    return;
  }
};

const signInQuery = {
  type: SignInModel,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(parent, args) {
    try{
      return await signIn(args.name, args.password);
    } catch(error){
      return error;
    }
  }
}

export {
  getAllUsersQuery,
  getUserByIDQuery,
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,
  signInQuery,
}
