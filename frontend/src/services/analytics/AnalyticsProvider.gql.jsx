import { gql } from "@apollo/client";

const LOG_EVENT = gql`
  mutation logEvent($sessionToken: String!, $event: ClickEventInput) {
    logEvent(sessionToken: $sessionToken, event: $event) {
      id
      sessionToken
      userID
    }
  }
`;

export default LOG_EVENT;
