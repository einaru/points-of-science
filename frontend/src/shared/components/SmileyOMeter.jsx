/* eslint-disable global-require */
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Subheading, Text } from "react-native-paper";
import { t } from "../../features/i18n";
import styles from "./SmileyOMeter.style";

const smileys = {
  awful: {
    score: -2,
    label: t("Awful"),
    asset: require("./assets/smiley-awful.png"),
  },
  notGood: {
    score: -1,
    label: t("Not very good"),
    asset: require("./assets/smiley-not-good.png"),
  },
  good: {
    score: 0,
    label: t("Good"),
    asset: require("./assets/smiley-good.png"),
  },
  reallyGood: {
    score: 1,
    label: t("Really good"),
    asset: require("./assets/smiley-really-good.png"),
  },
  brilliant: {
    score: 2,
    label: t("Brilliant"),
    asset: require("./assets/smiley-brilliant.png"),
  },
};

function Smiley({ score, label, asset, onPress }) {
  const handleOnPress = () => {
    onPress(score);
  };

  return (
    <TouchableOpacity style={styles.smileyContainer} onPress={handleOnPress}>
      <Image style={styles.smileyImage} source={asset} />
      <Text style={styles.smileyLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// A Smiley-o-meter implementation based on the Fun Toolkit from Janet C. Read
// See: https://dl.acm.org/doi/pdf/10.1145/1139073.1139096
export default function SmileyOMeter({ message, style, onPress }) {
  return (
    <View style={[styles.container, style]}>
      <Subheading>{message}</Subheading>
      <View style={styles.smileyometer}>
        {Object.entries(smileys).map(([key, item]) => (
          <Smiley
            key={key}
            score={item.score}
            label={item.label}
            asset={item.asset}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  );
}
