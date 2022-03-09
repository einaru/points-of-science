import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {
  addUserChallengeQuery,
  activateAccountQuery,
  authAccessTokenQuery,
  authRefreshTokenQuery,
  createAchievementQuery,
  createCategoryQuery,
  createChallengeQuery,
  deleteUserChallengeQuery,
  changePasswordQuery,
  getAllAchievementsQuery,
  getAllCategoriesQuery,
  getAllChallengesQuery,
  getAllUsersQuery,
  getUserProfile,
  getLeaderboardQuery,
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,
  signInQuery,
  signOutQuery,
  verifyUsernameQuery,
  getPermissionsQuery,
  setPermissionQuery,
  swapPermissionQuery,
  subscribeLeaderboard,
  subscribeSwappedPermission,
  subscribeUpdatedUser,
} from "../../internal.js";
import {
  logDeviceInfo,
  logEvent,
  deleteClickStream,
  getAllClickStreams,
} from "./Query/clickStreamQuery.js";
import { getAllContacts, addContact } from "./Query/contactQuery.js";

const ROOTQUERY = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    achievements: getAllAchievementsQuery,
    categories: getAllCategoriesQuery,
    challenges: getAllChallengesQuery,
    clickStreams: getAllClickStreams,
    users: getAllUsersQuery,
    leaderboard: getLeaderboardQuery,
    accessToken: authRefreshTokenQuery,
    contacts: getAllContacts,
    permissions: getPermissionsQuery,
    userProfile: getUserProfile,
    verifyToken: authAccessTokenQuery,
    verifyUsername: verifyUsernameQuery,
  },
});

const MUTATION = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addContact,
    addUserChallenge: addUserChallengeQuery,
    activateAccount: activateAccountQuery,
    changePassword: changePasswordQuery,
    createAchievement: createAchievementQuery,
    createCategory: createCategoryQuery,
    createChallenge: createChallengeQuery,
    createUser: createUserQuery,
    deleteUserChallenge: deleteUserChallengeQuery,
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

const SUBSCRIPTION = new GraphQLObjectType({
  name: "Subscription",
  fields: () => ({
    leaderboard: subscribeLeaderboard,
    swappedPermission: subscribeSwappedPermission,
    userChallengeAdded: subscribeUpdatedUser,
  }),
});

export default new GraphQLSchema({
  query: ROOTQUERY,
  mutation: MUTATION,
  subscription: SUBSCRIPTION,
});
