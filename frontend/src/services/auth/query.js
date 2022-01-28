import { gql } from "@apollo/client";

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
