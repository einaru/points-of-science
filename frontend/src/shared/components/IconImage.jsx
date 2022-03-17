import Color from "color";
import React from "react";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function IconImage({
  iconName,
  iconSize,
  iconColor: customIconColor,
  backgroundColor: customBgColor,
  style,
  theme,
}) {
  const defaultBgColor = theme.dark
    ? Color(theme.colors.background).lighten(0.24).rgb().string()
    : Color(theme.colors.background).darken(0.06).rgb().string();
  const defaultIconColor = theme.colors.placeholder;

  const iconColor = customIconColor || defaultIconColor;
  const backgroundColor = customBgColor || defaultBgColor;

  return (
    <View
      style={[
        style,
        {
          backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </View>
  );
}

export default withTheme(IconImage);
