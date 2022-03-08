/* eslint-disable import/prefer-default-export */

function rankScores(scores) {
  return scores
    .sort((a, b) => b.score - a.score)
    .map(({ username, score }, index) => ({
      rank: index + 1,
      username,
      score,
    }));
}

function calculatePoints(users) {
  return rankScores(
    users.map((user) => ({
      username: user.data.username,
      score: user.getPoints(),
    }))
  );
}

function calculatePointsByCategory(users, category) {
  return rankScores(
    users.map((user) => ({
      username: user.data.username,
      score: user.getPointsByCategory(category),
    }))
  );
}

function calculatePointsByDifficulty(users, difficulty) {
  return rankScores(
    users.map((user) => ({
      username: user.data.username,
      score: user.getPoints("difficulty", difficulty),
    }))
  );
}

export function createLeaderboards(users, categories, difficulties) {
  const asArray = (a) => (Array.isArray(a) ? a : [a]);

  // Ensure that all parameters are arrays
  const userArray = asArray(users);
  const categoryArray = asArray(categories);
  const difficultyArray = asArray(difficulties);

  const leaderboards = {
    highScores: calculatePoints(userArray),
    categories: categoryArray.map((category) => ({
      id: category.id,
      name: category.content.title,
      scores: calculatePointsByCategory(userArray, category),
    })),
    difficulties: difficultyArray.map((difficulty) => ({
      difficulty,
      scores: calculatePointsByDifficulty(userArray, difficulty),
    })),
  };
  return leaderboards;
}
