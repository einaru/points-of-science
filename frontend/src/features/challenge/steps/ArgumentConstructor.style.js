import color from "color";
import { StyleSheet } from "react-native";

export default function themedStyles(theme) {
  const { colors } = theme;

  // Match the background colors used react-native-paper TextInput
  const binBgColor = theme.dark
    ? color(colors.background).lighten(0.24).rgb().string()
    : color(colors.background).darken(0.06).rgb().string();

  return StyleSheet.create({
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
      backgroundColor: "magenta",
      borderRadius: 2,
      margin: 2,
      padding: 8,
    },
    placeholder: {
      flex: 1,
      justifyContent: "center",
      padding: 32,
    },
    centered: {
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
    },
    text: {
      marginTop: 8,
    },
    dragging: {
      opacity: 0.2,
    },
    hoverDragging: {},
    receiving: {
      borderColor: "tomato",
      borderStyle: "dashed",
      borderWidth: 2,
    },
  });
}
