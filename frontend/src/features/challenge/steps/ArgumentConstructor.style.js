import Color from "color";
import { StyleSheet } from "react-native";

export default function themedStyles(theme) {
  const { colors } = theme;

  // Match the background colors used react-native-paper TextInput
  const binBgColor = theme.dark
    ? Color(colors.background).lighten(0.24).rgb().string()
    : Color(colors.background).darken(0.06).rgb().string();

  return StyleSheet.create({
    content: {
      flex: 1,
      margin: 8,
    },
    question: {
      marginBottom: 8,
    },
    divider: {
      alignItems: "center",
      flex: 0,
      justifyContent: "center",
      marginVertical: 8,
    },
    icon: {
      color: colors.text,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: -8, // FIXME Adjust layout style of the challenge screens
      marginTop: 8,
    },
    bin: {
      backgroundColor: binBgColor,
      borderColor: binBgColor,
      borderRadius: 4,
      borderWidth: 2,
      flex: 2,
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 2,
    },
    item: {
      alignItems: "center",
      backgroundColor: colors.accent,
      borderRadius: 2,
      margin: 2,
      padding: 4,
    },
    placeholder: {
      flex: 1,
      justifyContent: "center",
      padding: 8,
    },
    centered: {
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: colors.placeholder,
      fontWeight: "bold",
      textAlign: "center",
    },
    text: {
      color: colors.placeholder,
      marginTop: 8,
      textAlign: "center",
    },
    dragging: {
      opacity: 0.2,
    },
    hoverDragging: {},
    receiving: {
      borderColor: colors.red,
      borderStyle: "dashed",
      borderWidth: 2,
    },
  });
}
