import React from "react";
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { Provider as ThemeProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/features/auth/AuthProvider";
import Navigation from "./src/features/navigation";
import PreferencesContext from "./src/features/preferences/PreferencesContext";
import useApiClient from "./src/services/api/useApiClient";
import { LoadingScreen } from "./src/shared/components";
import usePreferences from "./src/features/preferences/usePreferences";

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
            <SafeAreaProvider>
              <Navigation theme={theme} />
            </SafeAreaProvider>
          </AuthProvider>
          <StatusBar style={statusBarStyle} />
        </ApolloProvider>
      </ThemeProvider>
    </PreferencesContext.Provider>
  );
}
