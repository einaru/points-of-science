/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const USER_DATA = gql`
  fragment UserData on User {
    id
    username
    permission
  }
`;
