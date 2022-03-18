import { useQuery, useSubscription } from "@apollo/client";
import React from "react";

import AuthContext from "~services/auth/AuthContext";
import { LoadingScreen } from "~shared/components";
import { t } from "~shared/i18n";

import ContentContext from "./ContentContext";
import {
  GET_ALL_CONTACTS,
  GET_ALL_CONTENT,
  LEADERBOARDS_UPDATE,
  USER_PROFILE_UPDATE,
} from "./ContentProvider.gql";

function ContentProvider({ children }) {
  const [user, setUser] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [achievements, setAchievements] = React.useState([]);
  const [leaderboards, setLeaderboards] = React.useState({ highScore: {} });
  const [contacts, setContacts] = React.useState([]);

  // This ref and state is used to keep track of new unlocked achievements.
  // The function is exposed for consumers to be able to update the state when
  // a user have "seen" new achievements.
  const achievementsRef = React.useRef();
  const [hasNewAchievements, setHasNewAchievements] = React.useState(false);
  const hasSeenNewAchievements = () => setHasNewAchievements(false);

  const { loading } = useQuery(GET_ALL_CONTENT, {
    errorPolicy: "all",
    onCompleted: (data) => {
      setUser(data.userProfile || {});
      setCategories(data.categories || []);
      setAchievements(data.achievements || []);
      setLeaderboards(data.leaderboards || { highScore: {} });

      const userAchievements = data?.userProfile?.achievements;
      if (userAchievements) {
        achievementsRef.current = JSON.stringify(userAchievements);
      }
    },
  });

  useQuery(GET_ALL_CONTACTS, {
    onCompleted: (resp) => {
      if (resp.contacts) {
        setContacts(resp.contacts);
      }
    },
  });

  const { subscribeToken } = React.useContext(AuthContext);
  useSubscription(USER_PROFILE_UPDATE, {
    variables: { subscribeToken },
    onSubscriptionData: ({ subscriptionData }) => {
      const { userChallengeAdded } = subscriptionData.data;
      const userAchievements = JSON.stringify(userChallengeAdded.achievements);
      if (achievementsRef.current !== userAchievements) {
        achievementsRef.current = userAchievements;
        setHasNewAchievements(true);
      }
    },
  });
  useSubscription(LEADERBOARDS_UPDATE, { variables: { subscribeToken } });

  const content = React.useMemo(
    () => ({
      user,
      categories,
      achievements,
      leaderboards,
      contacts,
      hasNewAchievements,
      hasSeenNewAchievements,
    }),
    [user, categories, achievements, leaderboards, contacts, hasNewAchievements]
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
