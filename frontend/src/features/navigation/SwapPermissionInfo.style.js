import { StyleSheet } from "react-native";

export default function themedStyles(theme) {
  const { colors } = theme;
  return StyleSheet.create({
    contentContainer: {
      backgroundColor: colors.background,
      borderRadius: theme.roundness,
      elevation: 4,
      margin: 16,
      padding: 20,
      paddingTop: 16,
    },
    progress: {
      marginVertical: 8,
    },
    emojiContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      paddingVertical: 8,
    },
    title: {
      fontWeight: "bold",
    },
    thanks: {
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}
