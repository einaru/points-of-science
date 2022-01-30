import React from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

function Loading({ animating = true, message = "" }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ActivityIndicator animating={animating} size="large" />
        <Text style={styles.label}>{message}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Loading;
