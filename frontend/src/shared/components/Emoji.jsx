import React from "react";
import { Image } from "react-native";

import { emojis } from "~shared/assets";

function Emoji({ name, size = 64 }) {
  const source = emojis[name];
  return <Image source={source} style={{ width: size, height: size }} />;
}

export default Emoji;
