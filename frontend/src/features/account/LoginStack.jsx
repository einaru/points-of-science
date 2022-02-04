import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import ActivateAccountScreen from "./ActivateAccountScreen";
import ActivateAccountProvider from "./ActivateAccountProvider";

const Stack = createNativeStackNavigator();

function ActivateAccountScreenWrapper() {
  return (
    <ActivateAccountProvider>
      <ActivateAccountScreen />
    </ActivateAccountProvider>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account:login" component={LoginScreen} />
      <Stack.Screen
        name="account:activate"
        component={ActivateAccountScreenWrapper}
      />
      <Stack.Screen name="account:create" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
}

export default LoginStack;
