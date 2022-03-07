import { gql } from "@apollo/client";

export const CHALLENGE_DATA = gql`
  fragment ChallengeData on Challenge {
    id
    name
    image
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
`;
