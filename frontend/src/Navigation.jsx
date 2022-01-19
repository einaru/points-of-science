import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ContentNavigator from "./AppNavigation";
import AccountNavigator from "./AccountNavigator";
import { AuthContext } from "./services/auth/AuthProvider";

function Navigation() {
  const { authToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authToken == null ? <AccountNavigator /> : <ContentNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
