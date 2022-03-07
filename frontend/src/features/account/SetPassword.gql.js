import { gql } from "@apollo/client";

import { USER_DATA } from "~shared/fragments";

const ACTIVATE_ACCOUNT = gql`
  ${USER_DATA}

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
      subscribeToken
      user {
        ...UserData
      }
    }
  }
`;

export default ACTIVATE_ACCOUNT;
