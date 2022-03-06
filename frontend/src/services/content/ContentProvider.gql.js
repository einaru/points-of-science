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
        categoryID # FIXME Should provide "category { id name }" from backend
        reward {
          maxPoints
          firstTryPoints
          bonusPoints
        }
        activity {
          type
          description
          resources
          hints
        }
        reflectionType # FIXME Move this into the reflection object
        reflection {
          title
          solution
          choices
        }
      }
    }
  }
`;

export default GET_ALL_CATEGORIES;
