import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { Provider as ThemeProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { AuthProvider } from "./src/features/auth/AuthProvider";
import Navigation from "./src/features/navigation";
import PreferencesContext from "./src/features/preferences/PreferencesContext";
import { darkTheme, defaultTheme } from "./src/shared/theme";
import client from "./src/services/api/client";

export default function App() {
  const [preferDarkTheme, setPreferDarkTheme] = useState("");

  const theme = preferDarkTheme ? darkTheme : defaultTheme;
  const statusBarStyle = preferDarkTheme ? "light" : "dark";

  const toggleTheme = useCallback(() => {
    return setPreferDarkTheme(!preferDarkTheme);
  }, [preferDarkTheme]);

  useEffect(() => {
    if (Platform.OS === "android") {
      // According to the documentation the BottomNavigation component is
      // supposed to use the surface color in dark theme with adaptive mode,
      // but the color used is actually slightly lighter
      const color = preferDarkTheme ? "#272727" : theme.colors.primary;
      NavigationBar.setBackgroundColorAsync(color);
    }
  }, [preferDarkTheme, theme]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      preferDarkTheme,
    }),
    [toggleTheme, preferDarkTheme]
  );

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
