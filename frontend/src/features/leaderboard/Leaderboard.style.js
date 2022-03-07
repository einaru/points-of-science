import { StyleSheet } from "react-native";

export default function themedStyles(theme) {
  const { colors } = theme;
  return StyleSheet.create({
    row: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      height: 32,
      justifyContent: "space-between",
    },
    separator: {
      backgroundColor: colors.placeholder,
      height: 1,
    },
    rank: {
      width: 50,
    },
    name: {
      flex: 1,
    },
    score: {
      textAlign: "right",
      width: 75,
    },
  });
}
