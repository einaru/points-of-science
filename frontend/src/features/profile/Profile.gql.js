import { gql } from "@apollo/client";

const LOGOUT = gql`
  mutation signOut($refreshToken: String!) {
    signOut(refreshToken: $refreshToken) {
      message
    }
  }
`;

export default LOGOUT;
