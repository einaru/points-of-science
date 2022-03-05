import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import styles from "./HeaderTitle.style";

export default function HeaderTitle({ title, subtitle }) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.placeholder }]}>
        {subtitle}
      </Text>
    </View>
  );
}
