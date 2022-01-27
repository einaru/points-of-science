import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./features/login/LoginScreen";
import CreateAccountScreen from "./features/login/CreateAccountScreen";
import ActivateAccountStack from "./features/login/ActivateAccountStack";

const Stack = createNativeStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Activate account" component={ActivateAccountStack} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Create account" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
