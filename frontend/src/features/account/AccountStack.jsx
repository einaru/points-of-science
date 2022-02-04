import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import CreateAccountScreen from "./CreateAccountScreen";
import ActivateAccount from "./ActivateAccount";
import ActivateAccountProvider from "./ActivateAccountProvider";

const Stack = createNativeStackNavigator();

function ActivateAccountScreenWrapper() {
  return (
    <ActivateAccountProvider>
      <ActivateAccount />
    </ActivateAccountProvider>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account:login" component={Login} />
      <Stack.Screen
        name="account:activate"
        component={ActivateAccountScreenWrapper}
      />
      <Stack.Screen name="account:create" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
}

export default AccountStack;
