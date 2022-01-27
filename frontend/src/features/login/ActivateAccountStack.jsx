import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivateAccountUsernameScreen from "./ActivateAccountUsernameScreen";
import ActivateAccountPasswordScreen from "./ActivateAccountPasswordScreen";
import ActivateAccountProvider from "./ActivateAccountProvider";

const Stack = createNativeStackNavigator();

export default function ActivateAccountStack() {
  return (
    <ActivateAccountProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Account username"
          component={ActivateAccountUsernameScreen}
        />
        <Stack.Screen
          name="Account password"
          component={ActivateAccountPasswordScreen}
        />
      </Stack.Navigator>
    </ActivateAccountProvider>
  );
}
