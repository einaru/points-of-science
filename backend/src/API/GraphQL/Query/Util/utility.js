import { challengeCreator } from "../../../../internal.js";

function createContent(content, title = "", image = "", description = "") {
  const newContent = {
    title,
    image,
    description,
  };

  content.updateData(newContent);
}

function createChallenge(categoryID, difficulty, reflectionType) {
  const challenge = challengeCreator(reflectionType);
  const newChallenge = {
    categoryID,
    difficulty: difficulty || 1,
  };

  challenge.updateData(newChallenge);
  return challenge;
}

function createReward(reward, maxPoints, firstTryPoints, bonusPoints) {
  const newReward = {
    maxPoints,
    firstTryPoints,
    bonusPoints,
  };

  reward.updateData(newReward);
}

function createReflection(reflection, title, solution, choices) {
  reflection.setTitle(title);
  reflection.setSolution(solution);
  if (reflection.data.choices) {
    choices.forEach((choice) => {
      reflection.addChoice(choice);
    });
  }
}

function createActivity(activity, type, description, hints, resources) {
  activity.setType(type);
  activity.setDescription(description);
  if (hints != null) {
    hints.forEach((hint) => {
      activity.add(activity.data.hints, hint);
    });
  }

  if (resources != null) {
    resources.forEach((resource) => {
      activity.add(activity.data.resources, resource);
    });
  }
}

export {
  createActivity,
  createContent,
  createChallenge,
  createReflection,
  createReward,
};
