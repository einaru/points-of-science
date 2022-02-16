/* eslint-disable global-require */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { t } from "../i18n";
import ChallengeContext from "./ChallengeContext";
import { Activity, Completed, Intro, Reflection } from "./steps";

const Stack = createNativeStackNavigator();

function Challenge({ route }) {
  const { challenge } = route.params;

  return (
    <ChallengeContext.Provider value={challenge}>
      <View style={{ flex: 1 }} collapsable={false}>
        <Stack.Navigator>
          <Stack.Screen
            name="challenge:intro"
            options={{ title: t("Intro") }}
            component={Intro}
          />
          <Stack.Screen
            name="challenge:activity"
            options={{ title: t("Activity") }}
            component={Activity}
          />
          <Stack.Screen
            name="challenge:reflection"
            options={{ title: t("Reflection") }}
            component={Reflection}
          />
          <Stack.Screen
            name="challenge:completed"
            options={{ title: t("Challenge completed") }}
            component={Completed}
          />
        </Stack.Navigator>
      </View>
    </ChallengeContext.Provider>
  );
}

export default Challenge;
