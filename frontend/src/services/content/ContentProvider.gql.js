import { gql } from "@apollo/client";

const GET_ALL_CONTENT = gql`
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

  fragment UserProfile on User {
    id
    username
    permission
    challenges {
      challengeID
      answeredCorrect
    }
    progress {
      categories {
        id
        progress
      }
    }
  }

  fragment CategoryData on Category {
    id
    name
    image
    description
  }

  fragment ChallengeData on Challenge {
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

  fragment AchievementData on Achievement {
    id
    name
    image
    description
    type
    condition
  }
`;
export default GET_ALL_CONTENT;
