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
    subscribeToken: { type: GraphQLString },
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

export const PermissionEnum = new GraphQLEnumType({
  name: "PermissionEnum",
  values: {
    admin: { value: 1 },
    experiment: { value: 2 },
    control: { value: 3 },
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
    experiment: { type: GraphQLInt },
    control: { type: GraphQLInt },
  }),
});

export const SwapPermissionPayload = new GraphQLObjectType({
  name: "SwapPermissionPayload",
  fields: () => ({
    id: { type: GraphQLString },
    permission: { type: PermissionEnum },
  }),
});
