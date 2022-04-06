import Color from "color";
import { StyleSheet } from "react-native";

import commonStyles from "./styles";

export default function themedStyles(theme) {
  const { colors } = theme;

  const shoutOutText = {
    fontWeight: "bold",
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
      ...shoutOutText,
      fontSize: 32,
    },
    surface: {
      borderRadius: 4,
      elevation: 1,
      margin: 8,
      marginTop: 16,
    },
    rewardContainer: {
      marginVertical: 16,
      alignItems: "center",
    },
    points: {
      ...shoutOutText,
      fontSize: 48,
    },
    bonusPoints: {
      ...shoutOutText,
      fontSize: 28,
    },
  });
}
