import { gql } from "@apollo/client";

export const PERMISSION_SWAP = gql`
  subscription PermissionSwap($subscribeToken: String!) {
    swappedPermission(subscribeToken: $subscribeToken) {
      message
    }
  }
`;
