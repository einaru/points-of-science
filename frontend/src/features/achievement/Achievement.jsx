/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Avatar, TouchableRipple } from "react-native-paper";

import { stringToColor } from "~shared/colors";

function Achievement({ achievement, size, margin, onPress }) {
  const color = stringToColor(achievement.id);
  const props = {
    size,
    color: color.isDark()
      ? color.lighten(0.5).string()
      : color.darken(0.5).string(),
    style: {
      backgroundColor: color.string(),
      elevation: 4,
      margin,
    },
  };

  return (
    <TouchableRipple
      onPress={onPress}
      borderless
      style={{ borderRadius: size }}
    >
      {achievement.image ? (
        <Avatar.Image image={achievement.image} {...props} />
      ) : (
        <Avatar.Icon icon="star-circle" {...props} />
      )}
    </TouchableRipple>
  );
}

export default Achievement;
