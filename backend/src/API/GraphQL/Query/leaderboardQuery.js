import {
  LeaderboardModel,
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
    // assertHasExperimentPermission(user);

    const leaderboard = leaderboardCreator();
    leaderboard.setName("Leaderboard");

    const userData = await providers.users.getAll();
    const users = userData.filter((data) => {
      return data.state === 2 && data.permission === 3;
    });

    users.forEach((data) => {
      const profile = profileCreator();
      profile.updateData(data);
      leaderboard.addToLeaderboard(profile, leaderboard.data.profiles);
    });

    leaderboard.calculateTotalPoints();
    leaderboard.calculatePointsForCategory();

    return leaderboard.data;
  },
};

export { getLeaderboardQuery };
