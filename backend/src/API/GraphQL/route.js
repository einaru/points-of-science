import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {
  activateAccountQuery,
  authAccessTokenQuery,
  authRefreshTokenQuery,
  createCategoryQuery,
  changePasswordQuery,
  getAllCategoriesQuery,
  getAllUsersQuery,
  getUserByIDQuery,
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,
  signInQuery,
  signOutQuery,
  verifyUsernameQuery,
  getPermissionsQuery,
  setPermissionQuery,
  swapPermissionQuery,
} from "../../internal.js";

const ROOTQUERY = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllCategories: getAllCategoriesQuery,
    getAllUsers: getAllUsersQuery,
    getNewToken: authRefreshTokenQuery,
    getPermissions: getPermissionsQuery,
    getUserByID: getUserByIDQuery,
    verifyToken: authAccessTokenQuery,
    verifyUsername: verifyUsernameQuery,
  },
});

const MUTATION = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    activateAccount: activateAccountQuery,
    changePassword: changePasswordQuery,
    createCategory: createCategoryQuery,
    createUser: createUserQuery,
    deleteUser: deleteUserQuery,
    updateUser: updateUserQuery,
    signIn: signInQuery,
    setPermission: setPermissionQuery,
    signOut: signOutQuery,
    swapPermissionGroup: swapPermissionQuery,
  },
});

export default new GraphQLSchema({ query: ROOTQUERY, mutation: MUTATION });
