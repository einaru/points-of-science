import { gql } from "@apollo/client";

import { USER_PROFILE } from "./fragments.gql";

const LOGIN = gql`
  ${USER_PROFILE}

  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      accessToken
      refreshToken
      user {
        ...UserProfile
      }
    }
  }
`;

export default LOGIN;
