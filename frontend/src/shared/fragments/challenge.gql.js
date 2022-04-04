import { gql } from "@apollo/client";

export const CHALLENGE_DATA = gql`
  fragment ChallengeData on Challenge {
    id
    name
    images
    description
    difficulty
    category {
      id
      name
    }
    reward {
      maxPoints
      firstTryPoints
      bonusPoints
    }
    activity {
      type
      description
      hints
      resources {
        title
        url
      }
    }
    reflection {
      reflectionType # FIXME Rename to type
      title
      solution
      choices
    }
  }
`;
