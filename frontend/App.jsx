import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as ThemeProvider } from "react-native-paper";
import AppNavigator from "./src/AppNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
