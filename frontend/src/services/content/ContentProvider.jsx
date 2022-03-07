import { useQuery, useSubscription } from "@apollo/client";
import React from "react";

import AuthContext from "~services/auth/AuthContext";
import { LoadingScreen } from "~shared/components";
import { t } from "~shared/i18n";

import ContentContext from "./ContentContext";
import { GET_ALL_CONTENT, USER_CHALLENGE_ADDED } from "./ContentProvider.gql";

function ContentProvider({ children }) {
  const [user, setUser] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [achievements, setAchievements] = React.useState([]);

  const { loading, data } = useQuery(GET_ALL_CONTENT);

  React.useEffect(() => {
    if (data) {
      setUser(data.userProfile);
      setCategories(data.categories);
      setAchievements(data.achievements);
    }
  }, [data]);

  const { subscribeToken } = React.useContext(AuthContext);
  useSubscription(USER_CHALLENGE_ADDED, {
    variables: { subscribeToken },
    onSubscriptionData: ({ subscriptionData }) => {
      const { userChallengeAdded: userProfile } = subscriptionData.data;
      setUser(userProfile);
    },
  });

  const content = React.useMemo(
    () => ({
      user,
      categories,
      achievements,
    }),
    [user, categories, achievements]
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
