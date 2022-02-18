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
const deleteActivityQuery = {
  type: NormalResponseModel,
  args: {
    activityID: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);

    const challengesData = await getDataFromDatabaseByFilter(
      "activityID",
      args.activityID,
      config.db.table.challenge
    );

    if (challengesData == null || !challengesData.length) {
      throw new UserInputError(
        "The activity you try to delete does not exist."
      );
    }

    const deletedActivity = [];
    challengesData.forEach((challengeData) => {
      deletedActivity.push(
        new Promise((resolve, reject) => {
          const challenge = challengeCreator(challengeData.reflectionType);
          challenge
            .restoreObject(challenge, challengeData)
            .then(() => {
              return challenge.activity.deleteActivity(challenge);
            })
            .then(() => {
              return challenge.saveData(
                "challenge",
                challenge,
                config.db.table.challenge
              );
            })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        })
      );
    });

    await Promise.all(deletedActivity);

    return { message: `Activity successfully deleted.` };
  },
};

export { deleteActivityQuery };
