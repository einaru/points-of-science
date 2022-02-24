import { gql } from "@apollo/client";

const ACTIVATE_ACCOUNT = gql`
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
        id
        username
      }
    }
  }
`;

export default ACTIVATE_ACCOUNT;
