import { createObjectTemplate } from "../../internal.js";

function updateData(userAchievement) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "User achievement could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      userAchievement[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function isCompleted(userAchievement) {
  const functionKey = "isCompleted";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      userID: "",
      achievementID: "",
      completed: false,
    },
  };
}

function userAchievementCreator() {
  const userAchievement = emptyData();

  return {
    ...userAchievement,
    ...updateData(userAchievement.data),
    ...isCompleted(userAchievement.data),
  };
}

export { userAchievementCreator };
