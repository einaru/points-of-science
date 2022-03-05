import { gql } from "@apollo/client";

import { USER_PROFILE } from "./fragments.gql";

const ACTIVATE_ACCOUNT = gql`
  ${USER_PROFILE}

  mutation activateAccount(
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    activateAccount(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      accessToken
      refreshToken
      user {
        ...UserProfile
      }
    }
  }
`;

export default ACTIVATE_ACCOUNT;
