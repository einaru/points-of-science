import {
  activityCreator,
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
      const { activityID, contentID, reflectionID, rewardID } = challengeData;

      const contentData = getDataFromDatabaseByFilter(
        "id",
        contentID,
        config.db.table.content
      );

      const reflectionData = getDataFromDatabaseByFilter(
        "id",
        reflectionID,
        config.db.table.reflection
      );

      const rewardData = getDataFromDatabaseByFilter(
        "id",
        rewardID,
        config.db.table.reward
      );

      const activityData = getDataFromDatabaseByFilter(
        "id",
        activityID,
        config.db.table.activity
      );

      Promise.all([contentData, reflectionData, rewardData, activityData])
        .then((data) => {
          challenge.updateData(challengeData);

          if (data[0] != null) {
            const content = data[0][0];
            challenge.content.updateData(content);
          }

          if (data[1] != null) {
            const reflection = data[1][0];
            challenge.reflection.data.id = reflection.id;
            challenge.reflection.setTitle(reflection.title);
            challenge.reflection.setSolution(reflection.solution);
            if (challenge.reflection.data.choices) {
              reflection.choices.forEach((choice) => {
                challenge.reflection.addChoice(choice);
              });
            }
          }

          if (data[2] != null) {
            const reward = data[2][0];
            challenge.reward.updateData(reward);
          }

          if (data[3] != null) {
            const activity = data[3][0];
            challenge.activity.setID(activity.id);
            challenge.activity.setDescription(activity.description);
            challenge.activity.setType(activity.type);
            activity.hints.forEach((hint) => {
              challenge.activity.add(challenge.activity.data.hints, hint);
            });
            activity.resources.forEach((resource) => {
              challenge.activity.add(
                challenge.activity.data.resources,
                resource
              );
            });
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
