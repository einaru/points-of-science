import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ActivateAccount from "./ActivateAccount";
import ActivateAccountProvider from "./ActivateAccountProvider";

const Stack = createNativeStackNavigator();

function AccountStack() {
  return (
    <ActivateAccountProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="account:login" component={Login} />
        <Stack.Screen name="account:activate" component={ActivateAccount} />
        <Stack.Screen name="account:create" component={CreateAccount} />
      </Stack.Navigator>
    </ActivateAccountProvider>
  );
}

export default AccountStack;
