import { gql } from "@apollo/client";

const LOG_CLICK_STREAM = gql`
  mutation logClickStream($sessionToken: String!, $clicks: [ClickEventInput]) {
    logClickStream(sessionToken: $sessionToken, clicks: $clicks) {
      id
      sessionToken
      userID
    }
  }
`;

export default LOG_CLICK_STREAM;
