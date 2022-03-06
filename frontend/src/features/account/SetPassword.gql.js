import { gql } from "@apollo/client";

import { USER_DATA } from "./fragments.gql";

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
      user {
        ...UserData
      }
    }
  }
`;

export default ACTIVATE_ACCOUNT;
