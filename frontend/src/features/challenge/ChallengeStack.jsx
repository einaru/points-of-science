import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

import { t } from "~shared/i18n";

import CategoryList from "./category/CategoryList";
import ChallengeList from "./ChallengeList";
import ChallengeProvider from "./ChallengeProvider";
import { Activity, Completed, Intro, Reflection } from "./steps";

const Stack = createNativeStackNavigator();

function ChallengeStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <ChallengeProvider>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="category:list"
              component={CategoryList}
              options={{ title: t("Categories") }}
            />
            <Stack.Screen
              name="category:challenge-list"
              component={ChallengeList}
              options={{ title: t("Challenges") }}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="challenge:intro"
              component={Intro}
              options={{ title: t("Intro") }}
            />
            <Stack.Screen
              name="challenge:activity"
              component={Activity}
              options={{ title: t("Activity") }}
            />
            <Stack.Screen
              name="challenge:reflection"
              component={Reflection}
              options={{ title: t("Reflection") }}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="challenge:completed"
              component={Completed}
              options={{ title: t("Challenge completed"), headerShown: false }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </ChallengeProvider>
    </View>
  );
}

export default ChallengeStack;
