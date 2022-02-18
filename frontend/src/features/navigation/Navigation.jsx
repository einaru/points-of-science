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
  const { logEvent } = useContext(AnalyticsContext);

  const navigationRef = useNavigationContainerRef();
  const screenNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={() => {
        screenNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        if (navigationRef.isReady() && refreshToken) {
          const prevScreen = screenNameRef.current;
          const currScreen = navigationRef.getCurrentRoute().name;
          if (prevScreen !== currScreen) {
            const event = {
              event: "navigation",
              screen: currScreen,
              timestamp: Date.now().toString(),
              metadata: {
                prevScreen,
              },
            };
            logEvent(refreshToken, event);
          }
          screenNameRef.current = currScreen;
        }
      }}
    >
      {isAuthenticated ? <ContentNavigator /> : <AccountStack />}
    </NavigationContainer>
  );
}

export default Navigation;
