import {
  challengeCreator,
  getData,
  getFilter,
  getDataByFilter,
  updateData,
} from "../../internal.js";
import config from "../../Config/config.js";

function createObjectTemplate(functionKey, code) {
  const object = {};
  object[functionKey] = code;
  return object;
}

function getResponseObject(message, statusCode, type, data) {
  return {
    message,
    status: statusCode,
    type,
    data,
  };
}

function getDataFromDatabaseByFilter(key, value, table) {
  const filter = getFilter({
    key,
    operator: "==",
    value,
  });
  return getDataByFilter(table, filter);
}

function restoreChallenges(challengeList) {
  return new Promise((resolve, reject) => {
    getData(config.db.table.challenge)
      .then((data) => {
        const challengesData = data.filter((challenge) => {
          return challengeList.includes(challenge.id);
        });

        const challenges = [];
        challengesData.forEach((challengeData) => {
          challenges.push(
            new Promise((resolve, reject) => {
              const challenge = challengeCreator();
              challenge
                .restoreObject(challenge, challengeData)
                .then((object) => {
                  resolve(challenge);
                })
                .catch((error) => {
                  reject(error);
                });
            })
          );
        });

        if (!challenges.length) {
          resolve(null);
        } else {
          resolve(Promise.all(challenges));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getDataFromStoredObject(list, functionToCall) {
  const data = [];
  list.forEach((object) => {
    const { id } = functionToCall(object);
    data.push(id);
  });

  return data;
}

function getChallengeStoredObject(object) {
  return {
    id: object.data.id,
    categoryID: object.data.categoryID,
    difficulty: object.data.difficulty,
    contentID: object.content.data.id,
    reflectionType: object.data.reflectionType,
    reflectionID: object.reflection.data.id,
    rewardID: object.reward.data.id,
    activityID: object.activity.data.id,
  };
}

function getClickStreamStoredObject(object) {
  return {
    id: object.data.id,
    sessionToken: object.data.sessionToken,
    userID: object.data.userID,
    clicks: object.data.clicks,
  };
}

function getCategoryStoredObject(object) {
  return {
    id: object.data.id,
    challenges: getDataFromStoredObject(
      object.data.challenges,
      getChallengeStoredObject
    ),
    contentID: object.content.data.id,
    progressID: object.content.data.id,
  };
}

function getContentStoredObject(object) {
  return {
    id: object.data.id,
    title: object.data.title,
    image: object.data.image,
    description: object.data.description,
  };
}

function getReflectionStoredObject(object) {
  const entries = {
    id: object.data.id,
    title: object.data.title,
    solution: object.data.solution,
  };
  if (object.data.choices) {
    entries.choices = object.data.choices;
  }

  return entries;
}

function getRewardStoredObject(object) {
  return {
    id: object.data.id,
    maxPoints: object.data.maxPoints,
    firstTryPoints: object.data.firstTryPoints,
    bonusPoints: object.data.bonusPoints,
  };
}

function getActivityStoredObject(object) {
  return {
    id: object.data.id,
    type: object.data.type,
    description: object.data.description,
    hints: object.data.hints,
    resources: object.data.resources,
  };
}

function convertToStoredObject(key, object) {
  switch (key) {
    case "activity":
      return getActivityStoredObject(object);
    case "category":
      return getCategoryStoredObject(object);
    case "challenge":
      return getChallengeStoredObject(object);
    case "clickStream":
      return getClickStreamStoredObject(object);
    case "content":
      return getContentStoredObject(object);
    case "reflection":
      return getReflectionStoredObject(object);
    case "reward":
      return getRewardStoredObject(object);
    default:
      return {};
  }
}

function getDataFromResponseObject(list, functionToCall) {
  const data = [];
  list.forEach((object) => {
    data.push(functionToCall(object));
  });

  return data;
}

function getChallengeResponseObject(object) {
  return {
    id: object.data.id,
    categoryID: object.data.categoryID,
    difficulty: object.data.difficulty,
    name: object.content.data.title,
    description: object.content.data.description,
    image: object.content.data.image,
    reflection: object.reflection.data,
    reflectionType: object.data.reflectionType,
    reward: object.reward.data,
    activity: object.activity.data,
  };
}

function getClickStreamResponseObject(object) {
  return {
    id: object.data.id,
    sessionToken: object.data.sessionToken,
    userID: object.data.userID,
    items: object.data.clicks,
  };
}

function getCategoryResponseObject(object) {
  return {
    id: object.data.id,
    challenges: getDataFromResponseObject(
      object.data.challenges,
      getChallengeResponseObject
    ),
    name: object.content.data.title,
    description: object.content.data.description,
    image: object.content.data.image,
    progress: object.progress.data,
  };
}

function getContentResponseObject(object) {
  return {
    id: object.data.id,
    name: object.data.title,
    image: object.data.image,
    description: object.data.description,
  };
}

function getReflectionResponseObject(object) {
  const entries = {
    id: object.data.id,
    title: object.data.title,
  };
  if (object.data.choices) {
    entries.choices = object.data.choices;
  }

  return entries;
}

function getRewardResponseObject(object){
  return {
    id: object.data.id,
    maxPoints: object.data.maxPoints,
    firstTryPoints: object.data.firstTryPoints,
    bonusPoints: object.data.bonusPoints,
  };
}

function getActivityResponseObject(object) {
  return {
    id: object.data.id,
    type: object.data.type,
    description: object.data.description,
    hints: object.data.hints,
    resources: object.data.resources,
  };
}

function convertToResponseObject(key, object) {
  switch (key) {
    case "activity":
      return getActivityResponseObject(object);
    case "category":
      return getCategoryResponseObject(object);
    case "challenge":
      return getChallengeResponseObject(object);
    case "clickStream":
      return getClickStreamResponseObject(object);
    case "content":
      return getContentResponseObject(object);
    case "reflection":
      return getReflectionResponseObject(object);
    case "reward":
      return getRewardResponseObject(object);
    default:
      return {};
  }
}

function saveData() {
  const functionKey = "saveData";
  const code = (key, data, table) => {
    return new Promise((resolve, reject) => {
      const storedData = convertToStoredObject(key, data);
      updateData(table, storedData)
        .then(() => {
          resolve(convertToResponseObject(key, data));
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return createObjectTemplate(functionKey, code);
}

export {
  createObjectTemplate,
  convertToStoredObject,
  convertToResponseObject,
  getResponseObject,
  getDataFromDatabaseByFilter,
  saveData,
  restoreChallenges,
};
