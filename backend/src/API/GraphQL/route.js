import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { getAllUsersQuery, getUserByIDQuery, createUserQuery, deleteUserQuery, updateUserQuery } from '../../internal.js';

const ROOTQUERY = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: getAllUsersQuery,
    getUserByID: getUserByIDQuery,
  }
});

const MUTATION = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUserQuery,
    deleteUser: deleteUserQuery,
    updateUser: updateUserQuery,
  }
});

export default new GraphQLSchema({ query: ROOTQUERY, mutation: MUTATION });
