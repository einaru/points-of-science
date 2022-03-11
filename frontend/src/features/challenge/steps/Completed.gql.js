import { gql } from "@apollo/client";

export const ADD_USER_CHALLENGE = gql`
  mutation AddUserChallenge($data: UserChallengeInput!) {
    addUserChallenge(userChallenge: $data) {
      answeredCorrect
      completed
      reward {
        points
        bonusPoints
      }
    }
  }
`;

export const LOG_CHALLENGE_RATING = gql`
  mutation LogChallengeRating($evaluation: SmileOMeterInput!) {
    logSmileOMeter(evaluation: $evaluation) {
      message
    }
  }
`;
