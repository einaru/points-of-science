import { gql } from "@apollo/client";

import {
  ACHIEVEMENT_DATA,
  CATEGORY_DATA,
  CHALLENGE_DATA,
  USER_PROFILE,
} from "~shared/fragments";

const GET_ALL_CONTENT = gql`
  ${USER_PROFILE}
  ${CATEGORY_DATA}
  ${CHALLENGE_DATA}
  ${ACHIEVEMENT_DATA}

  query GetAllContent {
    userProfile {
      ...UserProfile
    }
    categories {
      ...CategoryData
      challenges {
        ...ChallengeData
      }
    }
    achievements {
      ...AchievementData
    }
  }
`;
export default GET_ALL_CONTENT;
