import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import styles from "./NoContent.style";

function NoContent({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default NoContent;
