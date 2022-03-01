import { gql } from "@apollo/client";

const ADD_USER_CHALLENGE = gql`
  mutation addUserChallenge($data: UserChallengeInput!) {
    addUserChallenge(userChallenge: $data) {
      message
    }
  }
`;

export default ADD_USER_CHALLENGE;
