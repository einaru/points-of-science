import React from "react";
import { Linking, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import AnalyticsContext from "../../services/analytics/AnalyticsContext";
import AuthContext from "../../services/auth/AuthContext";
import { LoadingScreen } from "../../shared/components";
import { t } from "../../shared/i18n";
import AccountStack from "../account/AccountStack";
import ContentNavigator from "./ContentNavigator";

const PERSISTENCE_KEY = "NAVIGATION_STATE";
function Navigation({ theme }) {
  const { loading, isAuthenticated } = React.useContext(AuthContext);
  const { logNavigationEvent } = React.useContext(AnalyticsContext);

  const navigationRef = useNavigationContainerRef();
  const screenRef = React.useRef();

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    // Enables state persistence for app navigation.
    // According to React Navigation this feature is considered experimental,
    // and all route params must be serializable for this to work properly.
    // See: https://reactnavigation.org/docs/state-persistence/#warning-serializable-state
    const restoreState = async () => {
      try {
        const url = await Linking.getInitialURL();

        if (Platform.OS !== "web" && url == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        theme={theme}
        onReady={() => {
          screenRef.current = navigationRef.getCurrentRoute();
        }}
        initialState={initialState}
        onStateChange={async (state) => {
          if (state) {
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
          }
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
    </GestureHandlerRootView>
  );
}

export default Navigation;
