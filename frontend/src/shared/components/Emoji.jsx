import React from "react";
import { Image } from "react-native";

const emojis = {
  partyPopper: require("./assets/emoji/party-popper.png"),
  partyingFace: require("./assets/emoji/partying-face.png"),
  rainbow: require("./assets/emoji/rainbow.png"),
  raisingHands: require("./assets/emoji/raising-hands.png"),
  rocket: require("./assets/emoji/rocket.png"),
  unicorn: require("./assets/emoji/unicorn.png"),
};

function Emoji({ name, size = 64 }) {
  const source = emojis[name];
  return <Image source={source} style={{ width: size, height: size }} />;
}

export default Emoji;
