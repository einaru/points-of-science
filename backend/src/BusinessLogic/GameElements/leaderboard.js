import { createObjectTemplate } from "../../internal.js";

function addToLeaderboard() {
  const key = "addToLeaderboard";
  const code = (profile, list) => {
    if (!Array.isArray(list)) {
      throw new Error("The list to add an element to is not an Array.");
    }

    if (profile !== Object(profile)) {
      throw new Error(
        "The profile to add to the leaderboard is not an object."
      );
    }

    const found = list.filter((element) => element.data.id === profile.data.id);

    if (!found.length) {
      list.push(profile);
    }
  };

  return createObjectTemplate(key, code);
}

function removeFromLeaderboard() {
  const key = "removeFromLeaderboard";
  const code = (profile, list) => {
    if (!Array.isArray(list)) {
      throw new Error("The list to add an element to is not an Array.");
    }

    if (profile !== Object(profile)) {
      throw new Error(
        "The profile to remove from the leaderboard is not an object."
      );
    }

    const ids = list.map((element) => element.data.id);
    const position = ids.indexOf(profile.data.id);
    if (position > -1) {
      list.splice(position, 1);
    }
  };

  return createObjectTemplate(key, code);
}

function calculateTotalPoints(leaderboard) {
  const key = "calculateTotalPoints";
  const code = () => {
    leaderboard.profiles.forEach((profile) => {
      leaderboard.highscore.push({
        username: profile.data.username,
        score: profile.getPoints(),
      });
    });
  };

  return createObjectTemplate(key, code);
}

function calculatePointsForCategory(leaderboard) {
  const key = "calculatePointsForCategory";
  const code = (category) => {
    leaderboard.profiles.forEach((profile) => {
      leaderboard.category.push({
        categoryID: category.id,
        username: profile.data.username,
        score: profile.getPointsByCategory(category),
      });
    });
  };

  return createObjectTemplate(key, code);
}

function calculateTotalPointsForDifficulty(leaderboard) {
  const key = "calculateTotalPointsForDifficulty";
  const code = (difficulty) => {
    leaderboard.profiles.forEach((profile) => {
      leaderboard.difficulty.push({
        difficulty,
        username: profile.data.username,
        score: profile.getPoints("difficulty", difficulty),
      });
    });
  };

  return createObjectTemplate(key, code);
}

function emptyData() {
  return {
    profiles: [],
    highscore: [],
    category: [],
    difficulty: [],
  };
}

function leaderboardCreator() {
  const props = emptyData();

  return {
    ...props,
    ...addToLeaderboard(),
    ...removeFromLeaderboard(),
    ...calculateTotalPoints(props),
    ...calculatePointsForCategory(props),
    ...calculateTotalPointsForDifficulty(props),
  };
}

export { leaderboardCreator };
