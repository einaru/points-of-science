/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  fragment UserProfile on User {
    id
    username
    permission
    challenges {
      challengeID
      answeredCorrect
    }
  }
`;
