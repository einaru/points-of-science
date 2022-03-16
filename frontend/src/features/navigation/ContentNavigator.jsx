import { useSubscription } from "@apollo/client";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { Portal } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import AchievementStack from "~features/achievement/AchievementStack";
import ChallengesStack from "~features/challenge/ChallengesStack";
import LeaderboardStack from "~features/leaderboard/LeaderboardStack";
import ProfileStack from "~features/profile/ProfileStack";
import AuthContext from "~services/auth/AuthContext";
import ContentContext from "~services/content/ContentContext";
import { t } from "~shared/i18n";
import Permission from "~shared/permission";

import { PERMISSION_SWAP } from "./SwapPermission.gql";
import SwapPermissionInfo from "./SwapPermissionInfo";

const tabIconMap = {
  "tab:challenges": "lightbulb-on",
  "tab:leaderboards": "trophy",
  "tab:achievements": "medal",
  "tab:profile": "account",
};
const Tab = createMaterialBottomTabNavigator();

function ContentNavigator() {
  const { user, subscribeToken, logOutUser } = React.useContext(AuthContext);
  const { hasNewAchievements } = React.useContext(ContentContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  useSubscription(PERMISSION_SWAP, {
    variables: { subscribeToken },
    onSubscriptionData: () => {
      setIsModalVisible(true);
    },
  });

  const hideModal = () => {
    setIsModalVisible(false);
    logOutUser();
  };

  const isGameElementsEnabled = React.useMemo(() => {
    return user.permission === Permission.EXPERIMENT;
  }, [user]);

  return (
    <>
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
              component={LeaderboardStack}
            />
            <Tab.Screen
              name="tab:achievements"
              options={{
                title: t("Achievements"),
                tabBarBadge: hasNewAchievements,
              }}
              component={AchievementStack}
            />
          </>
        )}
        <Tab.Screen
          name="tab:profile"
          options={{ title: t("Profile") }}
          component={ProfileStack}
        />
      </Tab.Navigator>
      <Portal>
        <SwapPermissionInfo visible={isModalVisible} onDismiss={hideModal} />
      </Portal>
    </>
  );
}

export default ContentNavigator;
