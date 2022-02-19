import React, { useContext, useRef } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import ContentNavigator from "./ContentNavigator";
import AccountStack from "../account/AccountStack";
import AuthContext from "../auth/AuthContext";
import AnalyticsContext from "../../services/analytics/AnalyticsContext";

function Navigation({ theme }) {
  const { refreshToken, isAuthenticated } = useContext(AuthContext);
  const { logNavigationEvent } = useContext(AnalyticsContext);

  const navigationRef = useNavigationContainerRef();
  const screenRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={() => {
        screenRef.current = navigationRef.getCurrentRoute();
      }}
      onStateChange={async () => {
        if (navigationRef.isReady() && refreshToken) {
          const prevScreen = screenRef.current;
          const currScreen = navigationRef.getCurrentRoute();
          if (prevScreen !== currScreen) {
            logNavigationEvent(refreshToken, prevScreen, currScreen);
          }
          screenRef.current = currScreen;
        }
      }}
    >
      {isAuthenticated ? <ContentNavigator /> : <AccountStack />}
    </NavigationContainer>
  );
}

export default Navigation;
