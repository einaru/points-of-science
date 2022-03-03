import Color from "color";
import { StyleSheet } from "react-native";

export default function themedStyles(theme) {
  const { colors } = theme;

  const overlayRow = {
    backgroundColor: Color(colors.background).fade(0.3).string(),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  };

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
      fontSize: 20,
      fontWeight: "bold",
    },
    meta: {
      ...overlayRow,
    },
    chip: {
      elevation: 2,
    },
  });
}
