import {
  LeaderboardsType,
  DifficultyEnum,
  createLeaderboards,
  profileCreator,
} from "../../../internal.js";
import {
  assertHasExperimentPermission,
  assertIsAuthenticated,
} from "../assert.js";

const getLeaderboardsQuery = {
  type: LeaderboardsType,
  args: {},
  async resolve(_, __, context) {
    assertIsAuthenticated(context.user);
    assertHasExperimentPermission(context.user);

    const { providers } = context;

    const difficulties = Object.keys(DifficultyEnum);
    const categories = await providers.categories.getAll();
    const users = await providers.users.getAll();
    const userProfiles = users
      .filter((user) => user.state === 2 && user.permission === 2)
      .map((user) => {
        const profile = profileCreator();
        profile.updateData(user);
        return profile;
      });

    const leaderboards = createLeaderboards(
      userProfiles,
      categories,
      difficulties
    );
    return leaderboards;
  },
};

export { getLeaderboardsQuery };
