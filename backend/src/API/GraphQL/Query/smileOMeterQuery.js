import { NormalResponseModel, SmileOMeterInput } from "../../../internal.js";
import { assertIsAuthenticated } from "../assert.js";
import { UserInputError } from "../error.js";

const logSmileOMeterQuery = {
  type: NormalResponseModel,
  args: {
    evaluation: { type: SmileOMeterInput },
  },
  async resolve(_, { evaluation }, { user, providers }) {
    assertIsAuthenticated(user);
    const { challengeID, value } = evaluation;
    if (!(await providers.challenges.getByID(challengeID))) {
      throw new UserInputError("Challenge does not exist.");
    }

    let data = {};
    const smileOMeterData = await providers.smileOMeters.getByID(challengeID);
    if (smileOMeterData) {
      const index = smileOMeterData.user.findIndex(
        (object) => object.id === user.id
      );

      if (index > -1) {
        const permissionIndex = smileOMeterData.user[
          index
        ].evaluation.findIndex(
          (object) => object.permission === user.permission
        );

        if (permissionIndex > -1) {
          smileOMeterData.user[index].evaluation[permissionIndex].value.push(
            value
          );
          data = smileOMeterData;
        } else {
          smileOMeterData.user[index].evaluation.push({
            permission: user.permission,
            value: [value],
          });
          data = smileOMeterData;
        }
      } else {
        smileOMeterData.user.push({
          id: user.id,
          evaluation: [{ permission: user.permission, value: [value] }],
        });
        data = smileOMeterData;
      }
    } else {
      data = {
        user: [
          {
            id: user.id,
            evaluation: [{ permission: user.permission, value: [value] }],
          },
        ],
        id: challengeID,
      };
    }

    await providers.smileOMeters.update(challengeID, data);
    return { message: "Challenge evaluation logged successfully." };
  },
};

export { logSmileOMeterQuery };
