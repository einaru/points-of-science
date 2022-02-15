import { createObjectTemplate, deleteData, saveData } from "../../internal.js";
import config from "../../Config/config.js";

function emptyData() {
  return {
    data: {
      id: "",
      maxPoints: 0,
      firstTryPoints: 0,
      bonusPoints: 0,
    },
  };
}

function updateData(reward) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Reward could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      reward[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function deleteReward(reward) {
  const functionKey = "deleteReward";
  const code = (challenge) => {
    return new Promise((resolve, reject) => {
      if (challenge == null || challenge !== Object(challenge)) {
        reject(
          Error(
            "Challenge to delete this reward from has wrong type. Input must be an object."
          )
        );
      }

      deleteData(config.db.table.reward, reward.id)
        .then((response) => {
          const emptyReward = emptyData();
          challenge.reward.updateData(emptyReward.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return createObjectTemplate(functionKey, code);
}

function rewardCreator() {
  const reward = emptyData();

  return {
    reward: {
      ...reward,
      ...updateData(reward.data),
      ...deleteReward(reward.data),
      ...saveData(),
    },
  };
}

export { rewardCreator };
