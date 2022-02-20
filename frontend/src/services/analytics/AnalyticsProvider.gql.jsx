import { gql } from "@apollo/client";

export const LOG_EVENT = gql`
  mutation logEvent($sessionToken: String!, $event: ClickEventInput) {
    logEvent(sessionToken: $sessionToken, event: $event) {
      id
      sessionToken
      userID
    }
  }
`;

export const LOG_DEVICE_INFO = gql`
  mutation logDeviceInfo($sessionToken: String!, $deviceInfo: DeviceInfoInput) {
    logDeviceInfo(sessionToken: $sessionToken, deviceInfo: $deviceInfo) {
      id
    }
  }
`;
