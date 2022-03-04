import React from "react";
import { useQuery } from "@apollo/client";
import { t } from "../../features/i18n";
import { LoadingScreen } from "../../shared/components";
import AuthContext from "../auth/AuthContext";
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
