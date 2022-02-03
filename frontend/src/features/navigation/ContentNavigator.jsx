import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AchievementsScreen from "../achievement/AchievementsScreen";
import ChallengesScreen from "../challenge/ChallengesScreen";
import DashboardScreen from "../dashboard/DashboardScreen";
import LeaderboardsScreen from "../leaderboard/LeaderboardsScreen";
import ProfileStack from "../profile/ProfileStack";

const tabIconMap = {
  Challenges: "lightbulb-on",
  Leaderboards: "trophy",
  Achievements: "medal",
  Dashboard: "view-dashboard",
  UserProfile: "account",
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
      <Tab.Screen name="UserProfile" component={ProfileStack} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Leaderboards" component={LeaderboardsScreen} />
      <Tab.Screen name="Achievements" component={AchievementsScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
}

export default ContentNavigator;
