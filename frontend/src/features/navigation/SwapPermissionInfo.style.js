import { StyleSheet } from "react-native";

export default function themedStyles(theme) {
  const { colors } = theme;
  return StyleSheet.create({
    contentContainer: {
      backgroundColor: colors.background,
      borderRadius: theme.roundness,
      elevation: 4,
      margin: 16,
      paddingBottom: 24,
      paddingHorizontal: 24,
      paddingTop: 16,
    },
    bold: {
      fontWeight: "bold",
    },
  });
}
