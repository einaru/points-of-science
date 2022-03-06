import { useQuery } from "@apollo/client";
import React from "react";

import { LoadingScreen } from "~shared/components";
import { t } from "~shared/i18n";

import ContentContext from "./ContentContext";
import GET_ALL_CATEGORIES from "./ContentProvider.gql";

function ContentProvider({ children }) {
  const { loading, data } = useQuery(GET_ALL_CATEGORIES);

  const content = React.useMemo(
    () => ({
      user: data?.userProfile,
      categories: data?.getAllCategories ?? [],
    }),
    [data]
  );

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
