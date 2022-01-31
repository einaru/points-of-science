import * as React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function Container({ children, noMargins = false }) {
  const style = noMargins ? { margin: 0 } : { margin: 8 };
  return (
    <SafeAreaView style={styles.container}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

export default Container;
