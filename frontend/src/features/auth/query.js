import { gql } from "@apollo/client";

export const VERIFY_TOKEN = gql`
  query verifyToken {
    verifyToken {
      message
    }
  }
`;

export const GET_NEW_TOKEN = gql`
  query getNewToken($refreshToken: String!) {
    getNewToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;
