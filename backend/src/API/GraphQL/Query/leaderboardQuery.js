import {
  LeaderboardModel,
  DifficultyEnum,
  leaderboardCreator,
  profileCreator,
} from "../../../internal.js";
import {
  assertHasExperimentPermission,
  assertIsAuthenticated,

} from "../assert.js";

// Root Queries - Used to retrieve data with GET-Requests

const getLeaderboardQuery = {
  type: LeaderboardModel,
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    assertHasExperimentPermission(user);

    const leaderboard = leaderboardCreator();
    leaderboard.setName("Leaderboard");

    const userData = await providers.users.getAll();
    const users = userData.filter((data) => {
      return data.state === 2 && data.permission === 2;
    });

    users.forEach((data) => {
      const profile = profileCreator();
      profile.updateData(data);
      leaderboard.addToLeaderboard(profile, leaderboard.data.profiles);
    });

    leaderboard.calculateTotalPoints();

    const categories = await providers.categories.getAll();
    categories.forEach((category) => {
      leaderboard.calculatePointsForCategory(category.id);
    });

    Object.keys(DifficultyEnum).forEach((key) => {
      leaderboard.calculateTotalPointsForDifficulty(DifficultyEnum[key]);
    });

    return leaderboard.data;
  },
};

export { getLeaderboardQuery };
