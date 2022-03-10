import { gql } from "@apollo/client";

import {
  ACHIEVEMENT_DATA,
  CATEGORY_DATA,
  CHALLENGE_DATA,
  LEADERBOARD_DATA,
  USER_PROFILE,
} from "~shared/fragments";

export const GET_ALL_CONTENT = gql`
  ${USER_PROFILE}
  ${CATEGORY_DATA}
  ${CHALLENGE_DATA}
  ${ACHIEVEMENT_DATA}
  ${LEADERBOARD_DATA}

  query GetAllContent {
    userProfile {
      ...UserProfile
    }
    categories {
      ...CategoryData
      challenges {
        ...ChallengeData
      }
    }
    achievements {
      ...AchievementData
    }
    leaderboards {
      highScores {
        ...LeaderboardData
      }
    }
  }
`;

export const GET_ALL_CONTACTS = gql`
  query GetContactInfo {
    contacts {
      name
      role
      phone
      email
    }
  }
`;

export const USER_CHALLENGE_ADDED = gql`
  ${USER_PROFILE}

  subscription UserChallengeAdded($subscribeToken: String!) {
    userChallengeAdded(subscribeToken: $subscribeToken) {
      ...UserProfile
    }
  }
`;

export const LEADERBOARDS_UPDATE = gql`
  ${LEADERBOARD_DATA}

  subscription LeaderboardsUpdate($subscribeToken: String!) {
    leaderboards(subscribeToken: $subscribeToken) {
      highScores {
        ...LeaderboardData
      }
    }
  }
`;
