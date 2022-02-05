import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { ResponseModel, UserModel } from "../../../internal.js";

const SignInDataModel = new GraphQLObjectType({
  name: "SignInData",
  fields: () => ({
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
    user: { type: UserModel },
  }),
});

const SignInModel = new GraphQLObjectType({
  name: "SignIn",
  fields: () => ({
    ...ResponseModel,
    data: { type: SignInDataModel },
  }),
});

const AccessTokenModel = new GraphQLObjectType({
  name: "AccessToken",
  fields: () => ({
    accessToken: { type: GraphQLString },
  }),
});

const AuthenticateTokenModel = new GraphQLObjectType({
  name: "AuthToken",
  fields: () => ({
    ...ResponseModel,
    data: { type: AccessTokenModel },
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

const PermissionStructure = new GraphQLObjectType({
  name: "PermissinStructure",
  fields: () => ({
    ADMIN: { type: GraphQLInt },
    EXPERIMENTAL: { type: GraphQLInt },
    CONTROL: { type: GraphQLInt },
  }),
});

const PermissionModel = new GraphQLObjectType({
  name: "Permission",
  fields: () => ({
    ...ResponseModel,
    data: { type: PermissionStructure },
  }),
});

export {
  SignInModel,
  AuthenticateTokenModel,
  PermissionStructure,
  PermissionModel,
};
