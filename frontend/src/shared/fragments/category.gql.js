import { gql } from "@apollo/client";

export const CATEGORY_DATA = gql`
  fragment CategoryData on Category {
    id
    name
    image
    description
  }
`;
