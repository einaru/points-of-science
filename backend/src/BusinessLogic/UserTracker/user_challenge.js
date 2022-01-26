import {
  userActivityCreator,
  userReflectionCreator,
  userRewardCreator,
} from "../../internal.js";

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

function updateData(userChallenge) {
  const key = "updateData";
  const code = (args) => {
    // Fill in the blanks
    for (const [key, value] of Object.entries(args)) {
      userChallenge[key] = value;
    }
  };

  return createObjectTemplate(key, code);
}

function calculatePoints(userChallenge) {
  const key = "calculatePoints";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function isCompleted(userChallenge) {
  const key = "isCompleted";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function isAnsweredCorrect(userChallenge) {
  const key = "isAnsweredCorrect";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(key, code);
}

function deleteUserChallenge(userChallenge) {
  const key = "deleteUserChallenge";
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
      challenge_id: 0,
      user_id: 0,
      completed: false,
      answered_correct: false,
    },
  };
}

export { userChallengeCreator };
