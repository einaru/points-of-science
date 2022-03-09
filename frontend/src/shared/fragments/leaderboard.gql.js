import { gql } from "@apollo/client";

export const HIGH_SCORE_DATA = gql`
  fragment HighScoreData on HighScore {
    userID
    username
    score
  }
`;

export const LEADERBOARD_DATA = gql`
  ${HIGH_SCORE_DATA}

  fragment LeaderboardData on Leaderboards {
    highScores {
      ...HighScoreData
    }
  }
`;
