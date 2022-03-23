import Color from "color";
import { StyleSheet } from "react-native";

export default function themedStyles(theme) {
  const { colors } = theme;

  const overlayRow = {
    backgroundColor: Color(colors.background).fade(0.6).string(),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  };

  return StyleSheet.create({
    list: {
      padding: 8,
    },
    surface: {
      borderRadius: theme.roundness,
      elevation: 2,
      marginBottom: 8,
    },
    ripple: {
      borderRadius: theme.roundness,
    },
    image: {
      width: "100%",
      height: 200,
    },
    content: {
      flex: 1,
      justifyContent: "space-between",
    },
    header: {
      ...overlayRow,
    },
    title: {
      flex: 1,
      fontSize: 20,
      fontWeight: "bold",
    },
    meta: {
      ...overlayRow,
      backgroundColor: null,
    },
    chip: {
      elevation: 2,
    },
  });
}
