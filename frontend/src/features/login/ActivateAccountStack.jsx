import React, { createContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivateAccountUsernameScreen from "./ActivateAccountUsernameScreen";
import ActivateAccountPasswordScreen from "./ActivateAccountPasswordScreen";

const Stack = createNativeStackNavigator();

export const AccountContext = createContext();

export default function ActivateAccountStack() {
  return (
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
  );
}
