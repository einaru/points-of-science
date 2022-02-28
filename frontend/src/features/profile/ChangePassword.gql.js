import { gql } from "@apollo/client";

const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!, $confirmPassword: String!) {
    changePassword(password: $password, confirmPassword: $confirmPassword) {
      message
    }
  }
`;

export default CHANGE_PASSWORD;
