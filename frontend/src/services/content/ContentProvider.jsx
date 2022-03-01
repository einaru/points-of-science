import { useQuery } from "@apollo/client";
import React, { useContext, useMemo } from "react";
import { LoadingScreen } from "../../shared/components";
import { t } from "../../features/i18n";
import ContentContext from "./ContentContext";
import GET_ALL_CATEGORIES from "./ContentProvider.gql";
import AuthContext from "../auth/AuthContext";

function ContentProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_ALL_CATEGORIES);

  const content = useMemo(
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
