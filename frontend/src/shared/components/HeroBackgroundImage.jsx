import Color from "color";
import React from "react";
import { ImageBackground, View } from "react-native";
import { withTheme } from "react-native-paper";

import heroImages from "./heroImages";

function HeroBackgroundImage({ name, width, height, fade, theme, children }) {
  const renderChildren = () => {
    return fade ? (
      <View
        style={{
          flex: 1,
          backgroundColor: Color(theme.colors.background).fade(fade).string(),
        }}
      >
        {children}
      </View>
    ) : (
      children
    );
  };

  return (
    <ImageBackground
      style={{
        width: width || "100%",
        height: height || "100%",
      }}
      source={heroImages[name]}
    >
      {renderChildren()}
    </ImageBackground>
  );
}

export default withTheme(HeroBackgroundImage);
