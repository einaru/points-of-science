import {
  contentCreator,
  createObjectTemplate,
  convertToResponseObject,
  deleteData,
  getDataFromDatabaseByFilter,
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
    return new Promise((resolve, reject) => {
      const { contentID, reflectionID, rewardID } = challengeData;

      const contentData = getDataFromDatabaseByFilter(
        contentID,
        config.db.table.content
      );

      const reflectionData = getDataFromDatabaseByFilter(
        reflectionID,
        config.db.table.reflection
      );

      const rewardData = getDataFromDatabaseByFilter(
        rewardID,
        config.db.table.reward
      );

      Promise.all([contentData, reflectionData, rewardData])
        .then((data) => {
          challenge.updateData(challengeData);

          let content = [];
          let reflection = [];
          let reward = [];
          if (data[0] != null) {
            content = data[0][0];
            challenge.content.updateData(content);
          }

          if (data[1] != null) {
            reflection = data[1][0];
            challenge.reflection.updateData(reflection);
          }

          if (data[2] != null) {
            reward = data[2][0];
            challenge.reward.updateData(reward);
          }

          resolve(convertToResponseObject("challenge", challenge));
        })
        .catch((error) => {
          reject(error);
        });
    });
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
    },
  };
}

function challengeCreator(reflectionType) {
  const content = contentCreator();
  // const activity =

  const reflection = addReflectionType(reflectionType);

  const reward = rewardCreator();
  const challenge = emptyData();

  return {
    ...content,
    // ...activity,
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
