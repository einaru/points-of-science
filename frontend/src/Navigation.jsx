import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ContentNavigator from "./ContentNavigator";
import AccountNavigator from "./AccountNavigator";
import { AuthContext } from "./services/auth/AuthProvider";

function Navigation() {
  const { accessToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {accessToken == null ? <AccountNavigator /> : <ContentNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
