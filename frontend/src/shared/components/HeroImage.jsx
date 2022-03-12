import React from "react";
import { Image } from "react-native";

import { illustrations } from "~shared/assets";

export default function HeroImage({ name, size = 256 }) {
  return (
    <Image
      style={{ alignSelf: "center", height: size, width: size }}
      source={illustrations[name]}
    />
  );
}
