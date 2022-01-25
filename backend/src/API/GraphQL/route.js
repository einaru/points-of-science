import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {
  authAccessTokenQuery,
  authRefreshTokenQuery,
  getAllUsersQuery,
  getUserByIDQuery,
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,
  signInQuery,
  signOutQuery,
} from "../../internal.js";

const ROOTQUERY = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: getAllUsersQuery,
    getNewToken: authRefreshTokenQuery,
    getUserByID: getUserByIDQuery,
    verifyToken: authAccessTokenQuery,
  },
});

const MUTATION = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUserQuery,
    deleteUser: deleteUserQuery,
    updateUser: updateUserQuery,
    signIn: signInQuery,
    signOut: signOutQuery,
  },
});

export default new GraphQLSchema({ query: ROOTQUERY, mutation: MUTATION });
