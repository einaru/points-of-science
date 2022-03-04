import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as ThemeProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import Navigation from "./src/features/navigation";
import AnalyticsProvider from "./src/services/analytics/AnalyticsProvider";
import useApiClient from "./src/services/api/useApiClient";
import AuthProvider from "./src/services/auth/AuthProvider";
import PreferencesContext from "./src/services/preferences/PreferencesContext";
import usePreferences from "./src/services/preferences/usePreferences";
import { LoadingScreen } from "./src/shared/components";

export default function App() {
  const client = useApiClient();
  const preferences = usePreferences();

  const { theme, preferDarkTheme } = preferences;
  const statusBarStyle = preferDarkTheme ? "light" : "dark";

  if (!client) {
    return <LoadingScreen />;
  }

  return (
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
  );
}
