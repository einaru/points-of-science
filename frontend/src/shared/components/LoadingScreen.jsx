import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import styles from "./LoadingScreen.style";

function LoadingScreen({ animating = true, message = "" }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={animating} size="large" />
      <Text style={styles.label}>{message}</Text>
    </View>
  );
}

export default LoadingScreen;
