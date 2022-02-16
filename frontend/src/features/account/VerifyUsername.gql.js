const { gql } = require("@apollo/client");

const VERIFY_USERNAME = gql`
  query verifyUsername($username: String!) {
    verifyUsername(username: $username) {
      message
    }
  }
`;

export default VERIFY_USERNAME;
