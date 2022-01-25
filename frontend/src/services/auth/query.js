import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation signIn($name: String!, $password: String!) {
    signIn(name: $name, password: $password) {
      type
      status
      message
      data {
        access_token
        refresh_token
        user {
          id
          name
        }
      }
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
  query getNewToken($refresh_token: String!) {
    getNewToken(refresh_token: $refresh_token) {
      type
      status
      message
      data {
        access_token
      }
    }
  }
`;
