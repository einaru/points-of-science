import { gql } from "@apollo/client";

import { CHALLENGE_DATA } from "./challenge.gql";

export const CATEGORY_DATA = gql`
  ${CHALLENGE_DATA}

  fragment CategoryData on Category {
    id
    name
    image
    description
    challenges {
      ...ChallengeData
    }
  }
`;
