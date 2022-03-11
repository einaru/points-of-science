/* eslint-disable import/prefer-default-export */

import {
  assertHasExperimentPermission,
  assertIsAuthenticated,
} from "../assert.js";

import { LeaderboardsType } from "../Model/leaderboardModel.js";
import { createLeaderboards } from "../../../BusinessLogic/GameElements/leaderboard.js";
import { profileCreator } from "../../../internal.js";

function isActiveAndPartOfExperiment(user) {
  return user.state === 2 && user.permission === 2;
}

export const getLeaderboardsQuery = {
  type: LeaderboardsType,
  args: {},
  async resolve(_, __, context) {
    assertIsAuthenticated(context.user);
    assertHasExperimentPermission(context.user);

    const { providers } = context;

    const users = await providers.users.getAll();
    const userProfiles = users
      .filter((user) => isActiveAndPartOfExperiment(user))
      .map((user) => {
        const profile = profileCreator();
        profile.updateData(user);
        return profile;
      });

    return createLeaderboards(userProfiles);
  },
};
