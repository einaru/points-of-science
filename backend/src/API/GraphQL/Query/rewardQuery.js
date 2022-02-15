import { GraphQLString } from "graphql";
import {
  NormalResponseModel,
  challengeCreator,
  getDataFromDatabaseByFilter,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";
import { UserInputError } from "../error.js";

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const deleteRewardQuery = {
  type: NormalResponseModel,
  args: {
    rewardID: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);

    const challengesData = await getDataFromDatabaseByFilter(
      "rewardID",
      args.rewardID,
      config.db.table.challenge
    );

    if (challengesData == null || !challengesData.length) {
      throw new UserInputError("The reward you try to delete does not exist.");
    }

    challengesData.forEach((challengeData) => {
      const challenge = challengeCreator();
      challenge
        .restoreObject(challenge, challengeData)
        .then(() => {
          return challenge.reward.deleteReward(challenge);
        })
        .then(() => {
          challenge.saveData("challenge", challenge, config.db.table.challenge);
        })
        .catch((error) => {
          throw new Error(error);
        });
    });

    return { message: `Reward successfully deleted.` };
  },
};

export { deleteRewardQuery };
