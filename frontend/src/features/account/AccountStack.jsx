import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ActivateAccount from "./ActivateAccount";
import ActivateAccountProvider from "./ActivateAccountProvider";
import { t } from "../i18n";

const Stack = createNativeStackNavigator();

function AccountStack() {
  return (
    <ActivateAccountProvider>
      <Stack.Navigator
        initialRouteName="account:login"
        screenOptions={{ headerShown: true, headerLeft: null }}
      >
        <Stack.Screen
          name="account:login"
          component={Login}
          options={{ title: t("Login") }}
        />
        <Stack.Screen
          name="account:activate"
          component={ActivateAccount}
          options={{ title: t("Activate account") }}
        />
        <Stack.Screen
          name="account:create"
          component={CreateAccount}
          options={{ title: t("Create account") }}
        />
      </Stack.Navigator>
    </ActivateAccountProvider>
  );
}

export default AccountStack;
