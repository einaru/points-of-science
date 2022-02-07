import React from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    paddingVertical: 12,
  },
});

function LoadingScreen({ animating = true, message = "" }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={animating} size="large" />
      <Text style={styles.label}>{message}</Text>
    </View>
  );
}

export default LoadingScreen;
