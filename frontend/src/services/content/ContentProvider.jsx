import { useQuery } from "@apollo/client";
import React from "react";

import AuthContext from "~services/auth/AuthContext";
import { LoadingScreen } from "~shared/components";
import { t } from "~shared/i18n";

import ContentContext from "./ContentContext";
import GET_ALL_CATEGORIES from "./ContentProvider.gql";

function ContentProvider({ children }) {
  const { user } = React.useContext(AuthContext);
  const { loading, data } = useQuery(GET_ALL_CATEGORIES);

  const content = React.useMemo(
    () => ({
      user,
      categories: data?.getAllCategories ?? [],
    }),
    [data, user]
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
