import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

import { t } from "~shared/i18n";

import HighScoreList from "./HighScoreList";

const Stack = createNativeStackNavigator();

export default function LeaderboardStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator>
        <Stack.Screen
          name="leaderboard:highscore"
          component={HighScoreList}
          options={{ title: t("High score") }}
        />
      </Stack.Navigator>
    </View>
  );
}
