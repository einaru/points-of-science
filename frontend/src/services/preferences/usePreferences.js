import { useCallback, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { darkTheme, defaultTheme } from "../../shared/theme";

function usePreferences() {
  const [preferDarkTheme, setPreferDarkTheme] = useState("");

  const theme = preferDarkTheme ? darkTheme : defaultTheme;

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
      theme,
      preferDarkTheme,
      toggleTheme,
    }),
    [theme, preferDarkTheme, toggleTheme]
  );

  return preferences;
}

export default usePreferences;
