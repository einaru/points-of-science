/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Avatar, TouchableRipple } from "react-native-paper";

import { getColorsFromString } from "~shared/colors";

function Achievement({ achievement, size, margin, onPress }) {
  const { bgColor, fgColor } = getColorsFromString(achievement.id);
  const props = {
    size,
    color: fgColor.string(),
    style: {
      backgroundColor: bgColor.string(),
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
