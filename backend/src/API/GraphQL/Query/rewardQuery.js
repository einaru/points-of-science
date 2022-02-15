import { GraphQLString } from "graphql";
import {
  NormalResponseModel,
  authenticateAccessToken,
  challengeCreator,
  checkPermissionLevel,
  getDataFromDatabaseByFilter,
} from "../../../internal.js";
import config from "../../../Config/config.js";

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests
const deleteRewardQuery = {
  type: NormalResponseModel,
  args: {
    rewardID: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      await authenticateAccessToken(context);
      const { user } = context;

      let response = checkPermissionLevel(config.permissionLevel.admin, user);
      if (response.type === "error") {
        return response;
      }

      const challengesData = await getDataFromDatabaseByFilter(
        "rewardID",
        args.rewardID,
        config.db.table.challenge
      );

      if (challengesData == null || !challengesData.length) {
        return getResponseObject(
          "The reward you try to delete does not exist.",
          400,
          config.responseType.error
        );
      }

      challengesData.forEach((challengeData) => {
        const challenge = challengeCreator();
        challenge
          .restoreObject(challenge, challengeData)
          .then(() => {
            return challenge.reward.deleteReward(challenge);
          })
          .then(() => {
            challenge.saveData(
              "challenge",
              challenge,
              config.db.table.challenge,
              "Challenge stored successfully."
            );
          })
          .catch((error) => {
            throw new Error(error);
          });
      });

      return getResponseObject(
        `Reward successfully deleted.`,
        200,
        config.responseType.success
      );
    } catch (error) {
      return error;
    }
  },
};

export { deleteRewardQuery };
