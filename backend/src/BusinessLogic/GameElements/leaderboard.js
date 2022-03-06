import { createObjectTemplate } from "../../internal.js";

function setName(leaderboard) {
  const key = "setName";
  const code = (name) => {
    if (name == null || typeof name !== "string") {
      throw new Error("Name must be a string.");
    }

    leaderboard.name = name;
  };

  return createObjectTemplate(key, code);
}

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
    leaderboard.leaderboards.highscore = [];
    leaderboard.profiles.forEach((profile) => {
      leaderboard.leaderboards.highscore.push({
        username: profile.data.username,
        score: profile.getPoints(null, null),
      });
    });
  };

  return createObjectTemplate(key, code);
}

function calculatePointsForCategory(leaderboard) {
  const key = "calculatePointsForCategory";
  const code = (categoryID) => {
    leaderboard.leaderboards.category = [];
    leaderboard.profiles.forEach((profile) => {
      leaderboard.leaderboards.category.push({
        categoryID,
        username: profile.data.username,
        score: profile.getPoints("categoryID", categoryID),
      });
    });
  };

  return createObjectTemplate(key, code);
}

function calculateTotalPointsForDifficulty(leaderboard) {
  const key = "calculateTotalPointsForDifficulty";
  const code = (difficulty) => {
    leaderboard.leaderboards.difficulty = [];
    leaderboard.profiles.forEach((profile) => {
      leaderboard.leaderboards.difficulty.push({
        difficulty,
        username: profile.data.username,
        score: profile.getPoints("diffculty", difficulty),
      });
    });
  };

  return createObjectTemplate(key, code);
}

function emptyData() {
  return {
    data: {
      name: "",
      profiles: [],
      leaderboards: {},
    },
  };
}

function leaderboardCreator() {
  const leaderboard = emptyData();

  return {
    ...leaderboard,
    ...setName(leaderboard.data),
    ...addToLeaderboard(),
    ...removeFromLeaderboard(),
    ...calculateTotalPoints(leaderboard.data),
    ...calculatePointsForCategory(leaderboard.data),
    ...calculateTotalPointsForDifficulty(leaderboard.data),
  };
}

export { leaderboardCreator };
