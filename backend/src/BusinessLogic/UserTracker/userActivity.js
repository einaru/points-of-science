import { createObjectTemplate } from "../../internal.js";

function updateData(userActivity) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "User activity could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      userActivity[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      hasOpenHints: false,
      hasOpenResources: false,
      dateStarted: "",
    },
  };
}

function userActivityCreator() {
  const userActivity = emptyData();

  return {
    userActivity: {
      ...userActivity,
      ...updateData(userActivity.data),
    },
  };
}

export { userActivityCreator };
