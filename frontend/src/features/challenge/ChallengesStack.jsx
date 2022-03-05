import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { t } from "../../shared/i18n";
import Challenge from "./Challenge";
import ChallengeList from "./ChallengeList";
import CategoryList from "./category/CategoryList";

const Stack = createNativeStackNavigator();

function ChallengeStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator>
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
        <Stack.Screen
          name="challenge:main"
          component={Challenge}
          options={{ title: t("Challenge"), headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default ChallengeStack;
