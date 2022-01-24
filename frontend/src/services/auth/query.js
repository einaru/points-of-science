import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation signIn($name: String!, $password: String!) {
    signIn(name: $name, password: $password) {
      type
      status
      message
      data {
        access_token
      }
    }
  }
`;
