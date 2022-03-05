import Color from "color";
import { StyleSheet } from "react-native";

import commonStyles from "./styles";

export default function themedStyles(theme) {
  const { colors } = theme;

  const textShadow = {
    textShadowColor: colors.background,
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 1,
  };

  return StyleSheet.create({
    ...commonStyles,
    backgroundOverlay: {
      backgroundColor: Color(colors.background).rgb().fade(0.9).string(),
      flex: 1,
    },
    shoutOutContainer: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    shoutOut: {
      ...textShadow,
      fontSize: 32,
      fontWeight: "bold",
    },
    surface: {
      borderRadius: 4,
      elevation: 1,
      margin: 8,
      marginTop: 16,
    },
    rewardContainer: {
      alignItems: "baseline",
      flexDirection: "row",
      marginVertical: 16,
    },
    rewardTitle: {
      ...textShadow,
      fontSize: 64,
      fontWeight: "bold",
    },
    rewardSubtitle: {
      ...textShadow,

      fontSize: 24,
      fontWeight: "bold",
      lineHeight: 64,
      marginStart: 8,
    },
  });
}
