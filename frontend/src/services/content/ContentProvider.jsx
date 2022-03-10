import { useQuery, useSubscription } from "@apollo/client";
import React from "react";

import AuthContext from "~services/auth/AuthContext";
import { LoadingScreen } from "~shared/components";
import { t } from "~shared/i18n";

import ContentContext from "./ContentContext";
import {
  GET_ALL_CONTENT,
  GET_ALL_CONTACTS,
  USER_PROFILE_UPDATE,
  LEADERBOARDS_UPDATE,
} from "./ContentProvider.gql";

function ContentProvider({ children }) {
  const [user, setUser] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [achievements, setAchievements] = React.useState([]);
  const [leaderboards, setLeaderboards] = React.useState({ highScore: {} });
  const [contacts, setContacts] = React.useState([]);

  const { loading, data } = useQuery(GET_ALL_CONTENT, { errorPolicy: "all" });

  React.useEffect(() => {
    if (data) {
      setUser(data.userProfile);
      setCategories(data.categories);
      setAchievements(data.achievements);
      setLeaderboards(data.leaderboards);
    }
  }, [data]);

  useQuery(GET_ALL_CONTACTS, {
    onCompleted: (resp) => {
      if (resp.contacts) {
        setContacts(resp.contacts);
      }
    },
  });

  const { subscribeToken } = React.useContext(AuthContext);
  const subscriptionPayload = { variables: { subscribeToken } };
  useSubscription(USER_PROFILE_UPDATE, subscriptionPayload);
  useSubscription(LEADERBOARDS_UPDATE, subscriptionPayload);

  const content = React.useMemo(
    () => ({
      user,
      categories,
      achievements,
      leaderboards,
      contacts,
    }),
    [user, categories, achievements, leaderboards, contacts]
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
