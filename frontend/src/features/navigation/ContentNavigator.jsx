import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AchievementsScreen from "../achievement/AchievementsScreen";
import ChallengesScreen from "../challenge/ChallengesScreen";
import DashboardScreen from "../dashboard/DashboardScreen";
import LeaderboardsScreen from "../leaderboard/LeaderboardsScreen";
import ProfileStack from "../profile/ProfileStack";
import { t } from "../i18n";

const tabIconMap = {
  ChallengesTab: "lightbulb-on",
  LeaderboardsTab: "trophy",
  AchievementsTab: "medal",
  DashboardTab: "view-dashboard",
  ProfileTab: "account",
};
const Tab = createMaterialBottomTabNavigator();

function ContentNavigator() {
  return (
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
        name="ProfileTab"
        options={{ title: t("Profile") }}
        component={ProfileStack}
      />
      <Tab.Screen
        name="ChallengesTab"
        options={{ title: t("Challenges") }}
        component={ChallengesScreen}
      />
      <Tab.Screen
        name="LeaderboardsTab"
        options={{ title: t("Leaderboards") }}
        component={LeaderboardsScreen}
      />
      <Tab.Screen
        name="AchievementsTab"
        options={{ title: t("Achievements") }}
        component={AchievementsScreen}
      />
      <Tab.Screen
        name="DashboardTab"
        options={{ title: t("Dashboard") }}
        component={DashboardScreen}
      />
    </Tab.Navigator>
  );
}

export default ContentNavigator;
