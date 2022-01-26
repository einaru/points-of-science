import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./features/login/LoginScreen";
import CreateAccountScreen from "./features/login/CreateAccountScreen";
import ActivateAccountProvider from "./features/login/ActivateAccountProvider";
import ActivateAccountStack from "./features/login/ActivateAccountStack";

const Stack = createNativeStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <ActivateAccountProvider>
        <Stack.Screen
          name="Activate account"
          component={ActivateAccountStack}
        />
      </ActivateAccountProvider>
      <Stack.Screen name="Create account" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
