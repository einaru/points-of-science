import { ApolloProvider } from "@apollo/client";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Platform } from "react-native";
import { Provider as ThemeProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "~features/navigation/Navigation";
import AnalyticsProvider from "~services/analytics/AnalyticsProvider";
import useApiClient from "~services/api/useApiClient";
import AuthProvider from "~services/auth/AuthProvider";
import PreferencesContext from "~services/preferences/PreferencesContext";
import usePreferences from "~services/preferences/usePreferences";
import Sentry, { ErrorBoundary, ErrorScreen } from "~services/sentry";
import { emojis, illustrations } from "~shared/assets";

function cacheImages(images) {
  return images.map((image) => {
    switch (typeof image) {
      case "string":
        return Image.prefetch(image);
      default:
        return Asset.fromModule(image).downloadAsync();
    }
  });
}

function App() {
  const [isReady, setIsReady] = React.useState(false);

  const client = useApiClient();
  const preferences = usePreferences();

  const { theme, preferDarkTheme } = preferences;
  const statusBarStyle = preferDarkTheme ? "light" : "dark";

  const loadAssets = async () => {
    const images = cacheImages([
      ...Object.values(emojis),
      ...Object.values(illustrations),
    ]);
    await Promise.all([images]);
  };

  if (!client || !isReady) {
    return (
      <AppLoading
        startAsync={loadAssets}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ErrorBoundary fallback={ErrorScreen}>
      <PreferencesContext.Provider value={preferences}>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AuthProvider>
              <AnalyticsProvider>
                <SafeAreaProvider>
                  <Navigation theme={theme} />
                </SafeAreaProvider>
              </AnalyticsProvider>
            </AuthProvider>
            <StatusBar style={statusBarStyle} />
          </ApolloProvider>
        </ThemeProvider>
      </PreferencesContext.Provider>
    </ErrorBoundary>
  );
}

export default Platform.OS === "web" ? App : Sentry.wrap(App);
