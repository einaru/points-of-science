import { gql } from "@apollo/client";

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $userID: String!
    $password: String!
    $confirmPassword: String!
  ) {
    changePassword(
      id: $userID
      password: $password
      confirmPassword: $confirmPassword
    ) {
      message
    }
  }
`;

export default CHANGE_PASSWORD;
