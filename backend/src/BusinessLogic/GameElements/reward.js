import { createObjectTemplate, saveData } from "../../internal.js";
import config from "../../Config/config.js";

function updateData(reward) {
  const key = "updateData";
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

  return createObjectTemplate(key, code);
}

function deleteReward(reward) {
  const key = "deleteReward";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      max_points: 0,
      first_try_points: 0,
      bonus_points: 0,
    },
  };
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
