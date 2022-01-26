import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      type
      status
      message
      data {
        accessToken
        refreshToken
        user {
          id
          username
        }
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation signOut($refreshToken: String!) {
    signOut(refreshToken: $refreshToken) {
      type
      status
      message
    }
  }
`;

export const VERIFY_TOKEN = gql`
  query verifyToken {
    verifyToken {
      type
      status
      message
    }
  }
`;

export const GET_NEW_TOKEN = gql`
  query getNewToken($refreshToken: String!) {
    getNewToken(refreshToken: $refreshToken) {
      type
      status
      message
      data {
        accessToken
      }
    }
  }
`;
