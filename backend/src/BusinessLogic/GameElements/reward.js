import { createObjectTemplate } from "../../internal.js";

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

function rewardCreator() {
  const reward = emptyData();

  return {
    reward: {
      ...reward,
      ...updateData(reward.data),
    },
  };
}

export { rewardCreator };
