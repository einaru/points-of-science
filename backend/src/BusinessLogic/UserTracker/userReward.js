import { createObjectTemplate } from "../../internal.js";

function updateData(userReward) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "User reward could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      userReward[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      points: 0,
      bonusPoints: 0,
    },
  };
}

function userRewardCreator() {
  const userReward = emptyData();

  return {
    userReward: {
      ...userReward,
      ...updateData(userReward.data),
    },
  };
}

export { userRewardCreator };
