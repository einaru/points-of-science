import {
  activityCreator,
  contentCreator,
  createObjectTemplate,
  convertToResponseObject,
  deleteData,
  reflectionCreator,
  argumentCreator,
  rewardCreator,
  saveData,
} from "../../internal.js";
import config from "../../Config/config.js";

const DifficultyEnum = Object.freeze({
  beginner: 1,
  intermediate: 2,
  expert: 3,
});

function updateChallenge(challenge) {
  const functionKey = "updateData";
  const code = (args) => {
    if (args == null || args !== Object(args)) {
      throw new Error(
        "Challenge could not be updated because of wrong type of input. Input must be an object."
      );
    }

    Object.keys(args).forEach((key) => {
      challenge[key] = args[key];
    });
  };

  return createObjectTemplate(functionKey, code);
}

function restoreObject() {
  const functionKey = "restoreObject";
  const code = (challenge, challengeData) => {
    try {
      challenge.updateData(challengeData);
      challenge.content.updateData(challengeData.content);

      challenge.activity.setID(challengeData.activity.id);
      challenge.activity.setDescription(challengeData.activity.description);
      challenge.activity.setType(challengeData.activity.type);
      challengeData.activity.hints.forEach((hint) => {
        challenge.activity.add(challenge.activity.data.hints, hint);
      });
      challengeData.activity.resources.forEach((resource) => {
        challenge.activity.add(challenge.activity.data.resources, resource);
      });

      challenge.reflection.setTitle(challengeData.reflection.title);
      challenge.reflection.data.id = challengeData.reflection.id;
      challenge.reflection.setSolution(challengeData.reflection.solution);
      if (challenge.reflection.data.choices) {
        challengeData.reflection.choices.forEach((choice) => {
          challenge.reflection.addChoice(choice);
        });
      }

      challenge.reward.updateData(challengeData.reward);

      return convertToResponseObject("challenge", challenge);
    } catch (error) {
      throw new Error(error);
    }
  };

  return createObjectTemplate(functionKey, code);
}

function deleteChallenge(challenge) {
  const key = "deleteChallenge";
  const code = (category) => {
    return new Promise((resolve, reject) => {
      if (category == null || category !== Object(category)) {
        reject(
          Error(
            "Category to delete this challenge from has wrong type. Input must be an object."
          )
        );
      }

      category.removeChallenge(challenge);
      deleteData(config.db.table.challenge, challenge.data.id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return createObjectTemplate(key, code);
}

function addReflectionType(reflectionType) {
  if (reflectionType) {
    return reflectionCreator();
  }

  return argumentCreator();
}

function emptyData() {
  return {
    data: {
      id: "",
      categoryID: "",
      difficulty: DifficultyEnum.beginner,
      difficultyLevels: DifficultyEnum,
      reflectionType: "",
    },
  };
}

function challengeCreator(reflectionType) {
  const content = contentCreator();
  const activity = activityCreator();

  const reflection = addReflectionType(reflectionType);
  const reward = rewardCreator();
  const challenge = emptyData();
  challenge.data.reflectionType = reflectionType;

  return {
    ...content,
    ...activity,
    ...reflection,
    ...reward,
    ...challenge,
    ...updateChallenge(challenge.data),
    ...restoreObject(),
    ...deleteChallenge(challenge.data),
    ...saveData(),
  };
}

export { challengeCreator };
