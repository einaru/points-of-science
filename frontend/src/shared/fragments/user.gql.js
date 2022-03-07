import { gql } from "@apollo/client";

export const USER_DATA = gql`
  fragment UserData on User {
    id
    username
    permission
  }
`;

export const USER_PROFILE = gql`
  fragment UserProfile on User {
    id
    username
    permission
    challenges {
      challengeID
      answeredCorrect
    }
    achievements {
      id
    }
    progress {
      categories {
        id
        progress
      }
    }
  }
`;
