/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { View } from "react-native";

import IconImage from "./IconImage";

function IconBackgroundImage(props) {
  const { style, children, ...rest } = props;
  return (
    <View style={style}>
      <IconImage
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        {...rest}
      />
      {children}
    </View>
  );
}

export default IconBackgroundImage;
