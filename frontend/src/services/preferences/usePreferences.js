import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { Platform } from "react-native";
import { darkTheme, defaultTheme } from "../../shared/theme";

function usePreferences() {
  const [preferDarkTheme, setPreferDarkTheme] = React.useState("");

  const theme = preferDarkTheme ? darkTheme : defaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setPreferDarkTheme(!preferDarkTheme);
  }, [preferDarkTheme]);

  React.useEffect(() => {
    if (Platform.OS === "android") {
      // According to the documentation the BottomNavigation component is
      // supposed to use the surface color in dark theme with adaptive mode,
      // but the color used is actually slightly lighter
      const color = preferDarkTheme ? "#272727" : theme.colors.primary;
      NavigationBar.setBackgroundColorAsync(color);
    }
  }, [preferDarkTheme, theme]);

  const preferences = React.useMemo(
    () => ({
      theme,
      preferDarkTheme,
      toggleTheme,
    }),
    [theme, preferDarkTheme, toggleTheme]
  );

  return preferences;
}

export default usePreferences;
