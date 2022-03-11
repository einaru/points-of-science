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

export const ADD_USER_CHALLENGE_RATING = gql`
  mutation AddUserChallengeRating($rating: UserChallengeRatingInput) {
    addUserChallengeRating(rating: $rating) {
      message
    }
  }
`;
