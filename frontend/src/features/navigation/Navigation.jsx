import React, { useContext, useRef } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import ContentNavigator from "./ContentNavigator";
import AccountStack from "../account/AccountStack";
import AuthContext from "../../services/auth/AuthContext";
import AnalyticsContext from "../../services/analytics/AnalyticsContext";
import { LoadingScreen } from "../../shared/components";
import { t } from "../i18n";

function Navigation({ theme }) {
  const { loading, isAuthenticated } = useContext(AuthContext);
  const { logNavigationEvent } = useContext(AnalyticsContext);

  const navigationRef = useNavigationContainerRef();
  const screenRef = useRef();

  if (loading) {
    return <LoadingScreen message={t("Get ready!")} />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={() => {
        screenRef.current = navigationRef.getCurrentRoute();
      }}
      onStateChange={async () => {
        if (navigationRef.isReady() && isAuthenticated) {
          const prevScreen = screenRef.current;
          const currScreen = navigationRef.getCurrentRoute();
          if (prevScreen !== currScreen) {
            logNavigationEvent(prevScreen, currScreen);
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
