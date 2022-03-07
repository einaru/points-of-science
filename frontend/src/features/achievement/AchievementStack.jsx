import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

import { t } from "~shared/i18n";

import AchievementList from "./AchievementList";

const Stack = createNativeStackNavigator();

export default function AchievementStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator>
        <Stack.Screen
          name="achievement:list"
          component={AchievementList}
          options={{ title: t("Achievements") }}
        />
      </Stack.Navigator>
    </View>
  );
}
