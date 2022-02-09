import { gql, useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { LoadingScreen } from "../../shared/components";
import { t } from "../i18n";
import ContentContext from "./ContentContext";

const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      type
      status
      message
      data {
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
  }
`;

function ContentProvider({ children }) {
  const { loading, data } = useQuery(GET_ALL_CATEGORIES);

  const content = useMemo(
    () => ({
      categories: data?.getAllCategories.data ?? [],
    }),
    [data]
  );

  if (data) {
    console.log("Got data:", data);
  }

  if (loading) {
    return <LoadingScreen message={t("Loading content…")} />;
  }

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentProvider;
