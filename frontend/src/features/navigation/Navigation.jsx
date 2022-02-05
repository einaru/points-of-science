import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ContentNavigator from "./ContentNavigator";
import AccountStack from "../account/AccountStack";
import { AuthContext } from "../auth/AuthProvider";

function Navigation({ theme }) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? <ContentNavigator /> : <AccountStack />}
    </NavigationContainer>
  );
}

export default Navigation;
