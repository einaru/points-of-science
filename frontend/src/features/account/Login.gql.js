import { gql } from "@apollo/client";

import { USER_DATA } from "./fragments.gql";

const LOGIN = gql`
  ${USER_DATA}

  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      accessToken
      refreshToken
      user {
        ...UserData
      }
    }
  }
`;

export default LOGIN;
