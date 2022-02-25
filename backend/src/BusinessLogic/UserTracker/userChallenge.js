import {
  userActivityCreator,
  userReflectionCreator,
  userRewardCreator,
  createObjectTemplate,
} from "../../internal.js";

function updateData(userChallenge) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Challenge could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      userChallenge[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function calculatePoints(userChallenge) {
  const functionKey = "calculatePoints";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function isCompleted(userChallenge) {
  const functionKey = "isCompleted";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function isAnsweredCorrect(userChallenge) {
  const functionKey = "isAnsweredCorrect";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function deleteUserChallenge(userChallenge) {
  const functionKey = "deleteUserChallenge";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      challengeID: "",
      userID: "",
      completed: false,
      answeredCorrect: false,
    },
  };
}

function userChallengeCreator() {
  const userChallenge = emptyData();
  const activity = userActivityCreator();
  const reflection = userReflectionCreator();
  const reward = userRewardCreator();

  return {
    ...activity,
    ...reflection,
    ...reward,
    ...userChallenge,
    ...updateData(userChallenge.data),
    ...isCompleted(userChallenge.data),
    ...isAnsweredCorrect(userChallenge.data),
    ...calculatePoints(userChallenge.data),
    ...deleteUserChallenge(userChallenge.data),
  };
}

export { userChallengeCreator };
