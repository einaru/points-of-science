import {
  contentCreator,
  createObjectTemplate,
} from "../../internal.js";

function setType(achievement) {
  const functionKey = "setType";
  const code = (type) => {
    if (!Number.isInteger(type)) {
      throw new Error("The achievement must be of type category or challenge.");
    }

    achievement.type = type;
  };

  return createObjectTemplate(functionKey, code);
}

function addCondition(achievement) {
  const functionKey = "addCondition";
  const code = (conditions) => {
    if (!Array.isArray(conditions)) {
      throw new Error("Conditions to add to an achievement must be an Array.");
    }

    conditions.forEach((condition) => {
      achievement.condition.push(condition);
    });
  };

  return createObjectTemplate(functionKey, code);
}

function removeCondition(achievement) {
  const functionKey = "removeCondition";
  const code = (conditions) => {
    if (!Array.isArray(conditions)) {
      throw new Error("Conditions to add to an achievement must be an Array.");
    }

    conditions.forEach((condition) => {
      const position = achievement.condition.indexOf(condition);
      if (position > -1) {
        achievement.condition.splice(position, 1);
      }
    });
  };

  return createObjectTemplate(functionKey, code);
}

function checkCondition(achievement) {
  const functionKey = "checkCondition";
  const code = (userChallenges) => {
    if (!Array.isArray(userChallenges)) {
      throw new Error(
        "User challenges must be an Array when checking an achievement's condition."
      );
    }

    const challengeIDs = userChallenges.map((item) => item.data.id);
    return achievement.condition.every((id) => challengeIDs.includes(id));
  };

  return createObjectTemplate(functionKey, code);
}

function convertToResponseObject() {
  const functionKey = "convertToResponseObject";
  const code = (object) => {
    return {
      id: object.data.id,
      condition: object.data.condition,
      type: object.data.type,
      name: object.content.data.title,
      description: object.content.data.description,
      image: object.content.data.image,
    };
  };

  return createObjectTemplate(functionKey, code);
}

function convertToStoredObject() {
  const functionKey = "convertToStoredObject";
  const code = (object) => {
    return {
      content: object.content.data,
      condition: object.data.condition,
      type: object.data.type,
    };
  };

  return createObjectTemplate(functionKey, code);
}

function deleteAchievement(achievement) {
  const functionKey = "deleteAchievement";
  const code = () => {
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function emptyData() {
  return {
    data: {
      id: "",
      condition: [],
      type: -1,
    },
  };
}

function achievementCreator() {
  const content = contentCreator();
  const achievement = emptyData();

  return {
    ...content,
    ...achievement,
    ...setType(achievement.data),
    ...addCondition(achievement.data),
    ...removeCondition(achievement.data),
    ...checkCondition(achievement.data),
    ...convertToResponseObject(),
    ...convertToStoredObject(),
    ...deleteAchievement(achievement.data),
  };
}

export { achievementCreator };
