import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ContentNavigator from "./ContentNavigator";
import AccountNavigator from "../../AccountNavigator";
import { AuthContext } from "../../services/auth/AuthProvider";

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <ContentNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
