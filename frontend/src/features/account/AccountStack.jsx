import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { t } from "../../shared/i18n";
import ActivateAccount from "./ActivateAccount";
import ActivateAccountProvider from "./ActivateAccountProvider";
import Login from "./Login";

const Stack = createNativeStackNavigator();

function AccountStack() {
  return (
    <ActivateAccountProvider>
      <Stack.Navigator
        initialRouteName="account:login"
        screenOptions={{
          headerShown: true,
          headerLeft: null,
          headerTitleAlign: "center",
        }}
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
      </Stack.Navigator>
    </ActivateAccountProvider>
  );
}

export default AccountStack;
