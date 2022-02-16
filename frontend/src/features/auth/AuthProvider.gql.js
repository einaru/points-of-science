import { gql } from "@apollo/client";

const VERIFY_TOKEN = gql`
  query verifyToken {
    verifyToken {
      message
    }
  }
`;

export default VERIFY_TOKEN;
