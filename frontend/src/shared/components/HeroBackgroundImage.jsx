import React from "react";
import { ImageBackground } from "react-native";
import heroImages from "./heroImages";

export default function HeroBackgroundImage({ name, width, height, children }) {
  return (
    <ImageBackground
      style={{
        width: width || "100%",
        height: height || "100%",
      }}
      source={heroImages[name]}
    >
      {children}
    </ImageBackground>
  );
}
