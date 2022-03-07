import { gql } from "@apollo/client";

export const ACHIEVEMENT_DATA = gql`
  fragment AchievementData on Achievement {
    id
    name
    image
    description
    type
    condition
  }
`;
