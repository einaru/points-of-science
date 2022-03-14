import { StyleSheet } from "react-native";

export default function themedStyle(theme) {
  const { colors } = theme;
  return StyleSheet.create({
    contentContainer: {
      backgroundColor: colors.background,
      borderRadius: theme.roundness,
      elevation: 4,
      margin: 16,
    },
    content: {
      marginHorizontal: 16,
      marginVertical: 16,
    },
    progressInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
}
