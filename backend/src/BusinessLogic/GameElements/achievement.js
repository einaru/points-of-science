import {
  contentCreator,
  createObjectTemplate,
  progressCreator,
} from "../../internal.js";

function setType(achievement) {
  const functionKey = "setType";
  const code = (type) => {
    if (!Number.isInteger(type)) {
      throw new Error("The achievement must be of type category or challenge.");
    }

    achievement.data.type = type;
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
    // Fill in the blanks
  };

  return createObjectTemplate(functionKey, code);
}

function checkCondition(achievement) {
  const functionKey = "checkCondition";
  const code = () => {
    // Fill in the blanks
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
      id: 0,
      condition: [],
      type: -1,
    },
  };
}

function achievementCreator() {
  const content = contentCreator();
  const progress = progressCreator();
  const achievement = emptyData();

  return {
    ...content,
    ...progress,
    ...achievement,
    ...setType(achievement.data),
    ...addCondition(achievement.data),
    ...removeCondition(achievement.data),
    ...checkCondition(achievement.data),
    ...deleteAchievement(achievement.data),
  };
}

export { achievementCreator };
