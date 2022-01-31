import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ContentNavigator from "./ContentNavigator";
import LoginStack from "../login/LoginStack";
import { AuthContext } from "../../services/auth/AuthProvider";

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <ContentNavigator /> : <LoginStack />}
    </NavigationContainer>
  );
}

export default Navigation;
