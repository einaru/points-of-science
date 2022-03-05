/* eslint-disable global-require */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

import { t } from "~shared/i18n";

import ChallengeProvider from "./ChallengeProvider";
import { Activity, Completed, Intro, Reflection } from "./steps";

const Stack = createNativeStackNavigator();

function Challenge({ route }) {
  const { challenge } = route.params;
  const analyticsParams = {
    challenge,
  };

  return (
    <ChallengeProvider challenge={challenge}>
      <View style={{ flex: 1 }} collapsable={false}>
        <Stack.Navigator>
          <Stack.Screen
            name="challenge:intro"
            options={{ title: t("Intro") }}
            component={Intro}
            initialParams={analyticsParams}
          />
          <Stack.Screen
            name="challenge:activity"
            options={{ title: t("Activity") }}
            component={Activity}
            initialParams={analyticsParams}
          />
          <Stack.Screen
            name="challenge:reflection"
            options={{ title: t("Reflection") }}
            component={Reflection}
            initialParams={analyticsParams}
          />
          <Stack.Screen
            name="challenge:completed"
            options={{ title: t("Challenge completed"), headerShown: false }}
            component={Completed}
            initialParams={analyticsParams}
          />
        </Stack.Navigator>
      </View>
    </ChallengeProvider>
  );
}

export default Challenge;
