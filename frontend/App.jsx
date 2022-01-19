import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as ThemeProvider } from "react-native-paper";
import { AuthProvider } from "./src/services/auth/AuthProvider";
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
