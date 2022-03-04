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
        "User challenge could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      if (key in userChallenge) {
        userChallenge[key] = args[key];
      }
    });
  };

  return createObjectTemplate(functionKey, code);
}

function calculatePoints() {
  const functionKey = "calculatePoints";
  const code = (userChallenge, challenge, isFirstTry, hasNotAllPoints) => {
    if (
      userChallenge == null ||
      userChallenge !== Object(userChallenge) ||
      challenge == null ||
      challenge !== Object(challenge)
    ) {
      throw new Error(
        "User challenge could not calculate points because of wrong type of input. Input must be an object."
      );
    }

    const data = { points: 0, bonusPoints: 0 };
    if (isFirstTry) {
      data.points += challenge.reward.firstTryPoints;
    }

    const isCorrectAnswer = userChallenge.userReflection.checkAnswer(
      challenge.reflection
    );

    if (isCorrectAnswer && hasNotAllPoints) {
      data.points += challenge.reward.maxPoints;

      if (isCorrectAnswer && isFirstTry) {
        data.bonusPoints = challenge.reward.bonusPoints;
      }
    }

    userChallenge.userReward.updateData(data);
  };

  return createObjectTemplate(functionKey, code);
}

function isCompleted() {
  const functionKey = "isCompleted";
  const code = (userChallenge) => {
    if (userChallenge == null || userChallenge !== Object(userChallenge)) {
      throw new Error(
        "User challenge could not be completed because of wrong type of input. Input must be an object."
      );
    }

    if (userChallenge.userReflection.isCompleted()) {
      userChallenge.data.completed = Date.now().valueOf().toString();
    } else {
      userChallenge.data.completed = "";
    }
  };

  return createObjectTemplate(functionKey, code);
}

function isAnsweredCorrect() {
  const functionKey = "isAnsweredCorrect";
  const code = (userChallenge, challenge) => {
    if (
      userChallenge == null ||
      userChallenge !== Object(userChallenge) ||
      challenge == null ||
      challenge !== Object(challenge)
    ) {
      throw new Error(
        "User challenge could not check if answer was correct because of wrong type of input. Input must be an object."
      );
    }

    const isCorrectAnswer = userChallenge.userReflection.checkAnswer(
      challenge.reflection
    );

    userChallenge.data.answeredCorrect = isCorrectAnswer;
  };

  return createObjectTemplate(functionKey, code);
}

function convertToStoredObject() {
  const functionKey = "convertToStoredObject";
  const code = (object) => {
    return {
      challengeID: object.data.challengeID,
      userID: object.data.userID,
      completed: object.data.completed,
      answeredCorrect: object.data.answeredCorrect,
      reflection: object.userReflection.data,
      reward: object.userReward.data,
      activity: object.userActivity.data,
    };
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
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
    ...isCompleted(),
    ...isAnsweredCorrect(),
    ...calculatePoints(),
    ...convertToStoredObject(),
  };
}

export { userChallengeCreator };
