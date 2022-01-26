function userActivityCreator() {
  const userActivity = emptyData();

  return {
    ...userActivity,
    ...updateData(userActivity.data),
    ...deleteUserActivity(userActivity.data),
  };
}

function updateData(userActivity) {
  const key = "updateData";
  const code = (args) => {
    // Fill in the blanks
    for (const [key, value] of Object.entries(args)) {
      userActivity[key] = value;
    }
  };

  return createObjectTemplate(key, code);
}

function deleteUserActivity(userActivity) {
  const key = "deleteUserActivity";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
}

function emptyData() {
  return {
    data: {
      id: 0,
      activity_id: 0,
      date_started: "0000-00-00T00:00:00.000Z",
      date_completed: "0000-00-00T00:00:00.000Z",
      answer: "",
    },
  };
}

export { userActivityCreator };
