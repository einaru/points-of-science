import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { UserModel } from '../../../internal.js';


//Root Queries - Used to retrieve data with GET-Requests
const getAllUsersQuery = {
  type: new GraphQLList(UserModel),
  args: {},
  resolve(parent, args) {
    return [{}];
  }
};


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
    return args;
  }
};

export {
  getAllUsersQuery,
  createUserQuery
}
