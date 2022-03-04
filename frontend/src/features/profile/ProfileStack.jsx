import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import ProjectInfo from "./ProjectInfo";
import { t } from "../i18n";
import Attributions from "./Attributions";

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
