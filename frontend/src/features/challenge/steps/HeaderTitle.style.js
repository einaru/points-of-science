import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  // Copied from react-navigation to get matching styles
  title: Platform.select({
    ios: {
      fontSize: 17,
      fontWeight: "600",
    },
    android: {
      fontSize: 20,
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    default: {
      fontSize: 18,
      fontWeight: "500",
    },
  }),
  subtitle: Platform.select({
    android: {
      fontSize: 12,
      fontFamily: "sans-serif-medium",
    },
    default: {
      fontSize: 12,
    },
  }),
});
