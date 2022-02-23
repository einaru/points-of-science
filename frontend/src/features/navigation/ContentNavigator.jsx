import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AchievementsScreen from "../achievement/AchievementsScreen";
import DashboardScreen from "../dashboard/DashboardScreen";
import LeaderboardsScreen from "../leaderboard/LeaderboardsScreen";
import ProfileStack from "../profile/ProfileStack";
import { t } from "../i18n";
import ChallengesStack from "../challenge/ChallengesStack";
import ContentProvider from "../../services/content/ContentProvider";

const tabIconMap = {
  "tab:challenges": "lightbulb-on",
  "tab:leaderboards": "trophy",
  "tab:achievements": "medal",
  "tab:dashboard": "view-dashboard",
  "tab:profile": "account",
};
const Tab = createMaterialBottomTabNavigator();

function ContentNavigator() {
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
          name="tab:profile"
          options={{ title: t("Profile") }}
          component={ProfileStack}
        />
        <Tab.Screen
          name="tab:challenges"
          options={{ title: t("Challenges") }}
          component={ChallengesStack}
        />
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
        <Tab.Screen
          name="tab:dashboard"
          options={{ title: t("Dashboard") }}
          component={DashboardScreen}
        />
      </Tab.Navigator>
    </ContentProvider>
  );
}

export default ContentNavigator;
