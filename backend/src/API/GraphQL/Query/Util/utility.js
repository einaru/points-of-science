import { challengeCreator, nextID } from "../../../../internal.js";
import config from "../../../../Config/config.js";

function createContent(content, title, image, description) {
  const contentID = nextID(config.db.table.content);
  const newContent = {
    id: contentID,
    title,
    image,
    description,
  };

  content.updateData(newContent);
  return content;
}

function createChallenge(categoryID, difficulty) {
  const id = nextID(config.db.table.challenge);
  const challenge = challengeCreator();
  const newChallenge = {
    id,
    categoryID,
    difficulty: difficulty || 1,
  };

  challenge.updateData(newChallenge);
  return challenge;
}

function saveChallenge(content, category, challenge, reward) {
  return new Promise((resolve, reject) => {
    content
      .saveData("content", content, config.db.table.content)
      .then((response) => {
        return reward.saveData("reward", reward, config.db.table.reward);
      })
      .then((response) => {
        category.addChallenge(challenge);
        return category.saveData(
          "category",
          category,
          config.db.table.category
        );
      })
      .then((response) => {
        return challenge.saveData(
          "challenge",
          challenge,
          config.db.table.challenge
        );
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function createReward(reward, maxPoints, firstTryPoints, bonusPoints) {
  const id = nextID(config.db.table.reward);
  const newReward = {
    id,
    maxPoints,
    firstTryPoints,
    bonusPoints,
  };

  reward.updateData(newReward);
  return reward;
}

export { createContent, createChallenge, createReward, saveChallenge };
