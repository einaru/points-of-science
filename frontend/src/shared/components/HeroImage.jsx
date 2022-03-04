import React from "react";
import { Image } from "react-native";
import heroImages from "./heroImages";

export default function HeroImage({ name, size = 256 }) {
  return (
    <Image
      style={{ alignSelf: "center", height: size, width: size }}
      source={heroImages[name]}
    />
  );
}
