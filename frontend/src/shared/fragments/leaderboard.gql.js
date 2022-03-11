import { gql } from "@apollo/client";

export const USER_SCORE_DATA = gql`
  fragment UserScoreData on UserScore {
    userID
    username
    score
  }
`;

export const LEADERBOARD_DATA = gql`
  ${USER_SCORE_DATA}

  fragment LeaderboardData on Leaderboard {
    id
    scores {
      ...UserScoreData
    }
  }
`;
