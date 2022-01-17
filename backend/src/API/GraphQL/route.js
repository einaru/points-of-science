import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { getAllUsersQuery, createUserQuery } from '../../internal.js';

const ROOTQUERY = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: getAllUsersQuery,
  }
});

const MUTATION = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUserQuery,
  }
});

export default new GraphQLSchema({ query: ROOTQUERY, mutation: MUTATION });
