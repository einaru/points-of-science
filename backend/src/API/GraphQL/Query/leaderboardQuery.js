import {
  LeaderboardType,
  DifficultyEnum,
  leaderboardCreator,
  profileCreator,
} from "../../../internal.js";
import {
  assertHasExperimentPermission,
  assertIsAuthenticated,
} from "../assert.js";

const getLeaderboardsQuery = {
  type: LeaderboardType,
  args: {},
  async resolve(_, __, { user, providers }) {
    assertIsAuthenticated(user);
    assertHasExperimentPermission(user);

    const leaderboard = leaderboardCreator();

    const userData = await providers.users.getAll();
    const users = userData.filter((data) => {
      return data.state === 2 && data.permission === 2;
    });

    users.forEach((data) => {
      const profile = profileCreator();
      profile.updateData(data);
      leaderboard.addToLeaderboard(profile, leaderboard.profiles);
    });

    leaderboard.calculateTotalPoints();

    const categories = await providers.categories.getAll();
    categories.forEach((category) => {
      leaderboard.calculatePointsForCategory(category);
    });

    Object.keys(DifficultyEnum).forEach((key) => {
      leaderboard.calculateTotalPointsForDifficulty(DifficultyEnum[key]);
    });

    return leaderboard;
  },
};

export { getLeaderboardsQuery };
