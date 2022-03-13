import {
  activityCreator,
  challengeContentCreator,
  createObjectTemplate,
  reflectionTypeCreator,
  rewardCreator,
} from "../../internal.js";

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
      challenge.reflection.setReflectionType(
        challengeData.reflection.reflectionType
      );
      if (challenge.reflection.data.reflectionType === 2) {
        challengeData.reflection.choices.forEach((choice) => {
          challenge.reflection.addChoice(choice);
        });
      }

      challenge.reward.updateData(challengeData.reward);
    } catch (error) {
      throw new Error(error);
    }
  };

  return createObjectTemplate(functionKey, code);
}

function deleteChallenge(challenge) {
  const functionKey = "deleteChallenge";
  const code = (category, providers) => {
    return new Promise((resolve, reject) => {
      if (category == null || category !== Object(category)) {
        reject(
          Error(
            "Category to delete this challenge from has wrong type. Input must be an object."
          )
        );
      }

      category.removeChallenge(challenge);
      resolve(providers.challenges.delete(challenge.id));
    });
  };

  return createObjectTemplate(functionKey, code);
}

function convertToStoredObject() {
  const functionKey = "convertToStoredObject";
  const code = (object) => {
    return {
      id: object.data.id,
      categoryID: object.data.categoryID,
      difficulty: object.data.difficulty,
      content: object.content.data,
      reflection: object.reflection.data,
      reward: object.reward.data,
      activity: object.activity.data,
    };
  };

  return createObjectTemplate(functionKey, code);
}

function convertToResponseObject() {
  const functionKey = "convertToResponseObject";
  const code = (object) => {
    return {
      id: object.data.id,
      category: {
        id: object.data.categoryID,
        name: "",
      },
      difficulty: object.data.difficulty,
      name: object.content.data.title,
      description: object.content.data.description,
      images: object.content.data.images,
      reflection: object.reflection.data,
      reward: object.reward.data,
      activity: object.activity.data,
    };
  };

  return createObjectTemplate(functionKey, code);
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
  const content = challengeContentCreator();
  const activity = activityCreator();

  const reflection = reflectionTypeCreator(reflectionType);
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
    ...convertToStoredObject(),
    ...convertToResponseObject(),
  };
}

export { challengeCreator, DifficultyEnum };
