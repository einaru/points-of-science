import { StyleSheet } from "react-native";

export default function themedStyle(theme) {
  const { colors } = theme;
  return StyleSheet.create({
    infoContainer: {
      backgroundColor: colors.background,
      borderRadius: theme.roundness,
      elevation: 4,
      margin: 16,
      paddingBottom: 24,
      paddingHorizontal: 24,
      paddingTop: 16,
    },
  });
}
