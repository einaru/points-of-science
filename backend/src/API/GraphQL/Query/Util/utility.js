import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import { challengeCreator } from "../../../../internal.js";

const options = {
  maxRetriesPerRequest: 50,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

function createContent(content, title = "", images = [], description = "") {
  const newContent = {
    title,
    images,
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

function createReflection(
  reflection,
  title,
  solution,
  choices,
  reflectionType
) {
  reflection.setTitle(title);
  reflection.setSolution(solution);
  reflection.setReflectionType(reflectionType);
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

async function initializeProgress(user, providers) {
  const copyUser = user;
  const categoriesData = await providers.categories.getAll();

  const userProgress = {
    progress: {
      categories: [],
      achievements: [],
    },
  };

  categoriesData.forEach((categoryData) => {
    userProgress.progress.categories.push({ id: categoryData.id, progress: 0 });
  });

  const achievements = await providers.achievements.getAll();
  achievements.forEach((achievementData) => {
    userProgress.progress.achievements.push({
      id: achievementData.id,
      progress: 0,
    });
  });

  copyUser.updateData(userProgress);

  return copyUser;
}

export {
  createActivity,
  createContent,
  createChallenge,
  createReflection,
  createReward,
  initializeProgress,
  pubsub,
};
