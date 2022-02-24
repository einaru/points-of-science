import React, { useContext, useEffect, useRef, useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContentNavigator from "./ContentNavigator";
import AccountStack from "../account/AccountStack";
import AuthContext from "../../services/auth/AuthContext";
import AnalyticsContext from "../../services/analytics/AnalyticsContext";
import { LoadingScreen } from "../../shared/components";
import { t } from "../i18n";

const PERSITENCE_KEY = "NAVIGATION_STATE";
function Navigation({ theme }) {
  const { loading, isAuthenticated } = useContext(AuthContext);
  const { logNavigationEvent } = useContext(AnalyticsContext);

  const navigationRef = useNavigationContainerRef();
  const screenRef = useRef();

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    // Enables state persitance for app navigation.
    // According to React Navigation this feaure is considered experimental,
    // and all route params must be serializable for this to work properly.
    // See: https://reactnavigation.org/docs/state-persistence/#warning-serializable-state
    const restoreState = async () => {
      try {
        const url = await Linking.getInitialURL();

        if (Platform.OS !== "web" && url == null) {
          const savedStateString = await AsyncStorage.getItem(PERSITENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : null;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (loading || !isReady) {
    return <LoadingScreen message={t("Get ready!")} />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={() => {
        screenRef.current = navigationRef.getCurrentRoute();
      }}
      initialState={initialState}
      onStateChange={async (state) => {
        AsyncStorage.setItem(PERSITENCE_KEY, JSON.stringify(state));
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
