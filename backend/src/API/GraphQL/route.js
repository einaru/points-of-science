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
  deleteActivityQuery,
  deleteRewardQuery,
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
    deleteActivity: deleteActivityQuery,
    deleteClickStream,
    deleteReward: deleteRewardQuery,
    deleteUser: deleteUserQuery,
    logEvent,
    updateUser: updateUserQuery,
    signIn: signInQuery,
    setPermission: setPermissionQuery,
    signOut: signOutQuery,
    swapPermissionGroup: swapPermissionQuery,
  },
});

export default new GraphQLSchema({ query: ROOTQUERY, mutation: MUTATION });
