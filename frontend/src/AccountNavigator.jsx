import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./features/login/LoginScreen";
import CreateAccountScreen from "./features/login/CreateAccountScreen";
import ActivateAccountScreen from "./features/login/ActivateAccountScreen";
import ActivateAccountProvider from "./features/login/ActivateAccountProvider";

const Stack = createNativeStackNavigator();

function ActivateAccountScreenWrapper() {
  return (
    <ActivateAccountProvider>
      <ActivateAccountScreen />
    </ActivateAccountProvider>
  );
}

function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Activate account"
        component={ActivateAccountScreenWrapper}
      />
      <Stack.Screen name="Create account" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
