import { gql } from "@apollo/client";

const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
      image
      description
      challenges {
        id
        name
        image
        description
        difficulty
        reward {
          maxPoints
          firstTryPoints
          bonusPoints
        }
        activity {
          resource {
            id
            title
            url
          }
          hint {
            id
            text
          }
        }
        reflection {
          title
          solution
        }
      }
    }
  }
`;

export default GET_ALL_CATEGORIES;
