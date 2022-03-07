/* eslint-disable react/jsx-props-no-spreading */

import Color from "color";
import React from "react";
import { Avatar, TouchableRipple, withTheme } from "react-native-paper";

import { getColorsFromString } from "~shared/colors";

function Achievement({
  achievement,
  size,
  margin,
  onPress,
  theme,
  locked = true,
}) {
  const [icon, setIcon] = React.useState("lock");
  const [colors, setColors] = React.useState({
    foreground: Color(theme.colors.gray).lighten(0.5).string(),
    background: theme.colors.gray,
  });

  React.useEffect(() => {
    if (!locked) {
      const { bgColor, fgColor } = getColorsFromString(achievement.id);
      setIcon("star-circle");
      setColors({
        background: bgColor.string(),
        foreground: fgColor.string(),
      });
    }
  }, [locked, achievement]);

  const props = React.useMemo(
    () => ({
      size,
      color: colors.foreground,
      style: {
        backgroundColor: colors.background,
        elevation: 4,
        margin,
      },
    }),
    [size, margin, colors]
  );

  return (
    <TouchableRipple
      onPress={onPress}
      borderless
      style={{ borderRadius: size }}
    >
      {achievement.image ? (
        <Avatar.Image image={achievement.image} {...props} />
      ) : (
        <Avatar.Icon icon={icon} {...props} />
      )}
    </TouchableRipple>
  );
}

export default withTheme(Achievement);
