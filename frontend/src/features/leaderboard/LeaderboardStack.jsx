import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

import { t } from "~shared/i18n";

import Leaderboard from "./Leaderboard";

const Stack = createNativeStackNavigator();

export default function LeaderboardStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator>
        <Stack.Screen
          name="leaderboard:screen"
          component={Leaderboard}
          options={{ title: t("High score") }}
        />
      </Stack.Navigator>
    </View>
  );
}
