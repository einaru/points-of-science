import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      accessToken
      refreshToken
      user {
        id
        username
      }
    }
  }
`;

export default LOGIN;
