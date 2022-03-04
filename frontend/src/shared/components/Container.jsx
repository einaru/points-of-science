import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Container.style";

function Container({ children, noMargins = false }) {
  const style = noMargins ? { margin: 0 } : { margin: 8 };
  return (
    <SafeAreaView style={styles.container}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

export default Container;
