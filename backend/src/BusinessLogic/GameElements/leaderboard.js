/* eslint-disable import/prefer-default-export */

function getHighScores(users) {
  return users
    .map((user) => ({
      userID: user.data.id,
      username: user.data.username,
      score: user.getPoints(),
    }))
    .sort((a, b) => b.score - a.score);
}

export function createLeaderboards(users) {
  const asArray = (a) => (Array.isArray(a) ? a : [a]);
  return {
    highScores: {
      id: "highScores",
      scores: getHighScores(asArray(users)),
    },
  };
}
