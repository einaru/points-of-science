import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import AuthContext from "../../services/auth/AuthContext";
import ContentProvider from "../../services/content/ContentProvider";
import { t } from "../../shared/i18n";
import Permission from "../../shared/permission";
import AchievementsScreen from "../achievement/AchievementsScreen";
import ChallengesStack from "../challenge/ChallengesStack";
import LeaderboardsScreen from "../leaderboard/LeaderboardsScreen";
import ProfileStack from "../profile/ProfileStack";

const tabIconMap = {
  "tab:challenges": "lightbulb-on",
  "tab:leaderboards": "trophy",
  "tab:achievements": "medal",
  "tab:dashboard": "view-dashboard",
  "tab:profile": "account",
};
const Tab = createMaterialBottomTabNavigator();

function ContentNavigator() {
  const { user } = React.useContext(AuthContext);

  const isGameElementsEnabled = React.useMemo(() => {
    return user.permission === Permission.EXPERIMENT;
  }, [user]);

  return (
    <ContentProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            const iconName = tabIconMap[route.name];
            return (
              <MaterialCommunityIcons name={iconName} size={24} color={color} />
            );
          },
        })}
      >
        <Tab.Screen
          name="tab:challenges"
          options={{ title: t("Challenges") }}
          component={ChallengesStack}
        />
        {isGameElementsEnabled && (
          <>
            <Tab.Screen
              name="tab:leaderboards"
              options={{ title: t("Leaderboards") }}
              component={LeaderboardsScreen}
            />
            <Tab.Screen
              name="tab:achievements"
              options={{ title: t("Achievements") }}
              component={AchievementsScreen}
            />
          </>
        )}
        <Tab.Screen
          name="tab:profile"
          options={{ title: t("Profile") }}
          component={ProfileStack}
        />
      </Tab.Navigator>
    </ContentProvider>
  );
}

export default ContentNavigator;
