import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { t } from "../../shared/i18n";
import Attributions from "./Attributions";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import ProjectInfo from "./ProjectInfo";

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator initialRouteName="profile:main">
        <Stack.Screen
          name="profile:main"
          options={{ title: t("Profile"), headerShown: false }}
          component={Profile}
        />
        <Stack.Screen
          name="profile:change-password"
          options={{ title: t("Change password") }}
          component={ChangePassword}
        />
        <Stack.Screen
          name="profile:project-info"
          options={{ title: t("Project info") }}
          component={ProjectInfo}
        />
        <Stack.Screen
          name="profile:attributions"
          options={{ title: t("Attributions") }}
          component={Attributions}
        />
      </Stack.Navigator>
    </View>
  );
}

export default ProfileStack;
