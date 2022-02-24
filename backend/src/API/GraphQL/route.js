import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {
  activateAccountQuery,
  authAccessTokenQuery,
  authRefreshTokenQuery,
  createCategoryQuery,
  createChallengeQuery,
  changePasswordQuery,
  getAllCategoriesQuery,
  getAllChallengesQuery,
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
import {
  logDeviceInfo,
  logEvent,
  deleteClickStream,
  getAllClickStreams,
} from "./Query/clickStreamQuery.js";

const ROOTQUERY = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllCategories: getAllCategoriesQuery,
    getAllChallenges: getAllChallengesQuery,
    getAllClickStreams,
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
    createChallenge: createChallengeQuery,
    createUser: createUserQuery,
    deleteClickStream,
    deleteUser: deleteUserQuery,
    logDeviceInfo,
    logEvent,
    updateUser: updateUserQuery,
    signIn: signInQuery,
    setPermission: setPermissionQuery,
    signOut: signOutQuery,
    swapPermissionGroup: swapPermissionQuery,
  },
});

export default new GraphQLSchema({ query: ROOTQUERY, mutation: MUTATION });
