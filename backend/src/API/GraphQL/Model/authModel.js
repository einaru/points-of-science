import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
} from "graphql";
import { UserModel } from "../../../internal.js";

export const SignInModel = new GraphQLObjectType({
  name: "SignIn",
  fields: () => ({
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
    user: { type: UserModel },
  }),
});

export const AccessTokenModel = new GraphQLObjectType({
  name: "AccessToken",
  fields: () => ({
    accessToken: { type: GraphQLString },
  }),
});

export const MessageResponseModel = new GraphQLObjectType({
  name: "MessageResponse",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

const PermissionEnum = new GraphQLEnumType({
  name: "PermissionEnum",
  values: {
    ADMIN: { value: 1 },
    EXPERIMENTAL: { value: 2 },
    CONTROL: { value: 3 },
  },
});

export const PermissionInputModel = new GraphQLInputObjectType({
  name: "PermissionInput",
  fields: () => ({
    userID: { type: GraphQLString },
    permission: { type: PermissionEnum },
  }),
});

export const PermissionModel = new GraphQLObjectType({
  name: "Permission",
  fields: () => ({
    admin: { type: GraphQLInt },
    experimental: { type: GraphQLInt },
    control: { type: GraphQLInt },
  }),
});
