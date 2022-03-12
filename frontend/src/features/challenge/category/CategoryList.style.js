import { StyleSheet } from "react-native";

const itemHeight = 104;

export default function themedStyles(theme) {
  return StyleSheet.create({
    list: {
      flex: 1,
      margin: 8,
    },
    surface: {
      borderRadius: theme.roundness,
      elevation: 2,
      marginBottom: 8,
    },
    ripple: {
      borderRadius: theme.roundness,
    },
    item: {
      flexDirection: "row",
      height: itemHeight,
    },
    image: {
      borderBottomLeftRadius: theme.roundness,
      borderTopLeftRadius: theme.roundness,
      height: itemHeight,
      width: itemHeight,
    },
    content: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      margin: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    progressRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
}
