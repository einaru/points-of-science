import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../shared/styles";

function FormView({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>{children}</View>
    </SafeAreaView>
  );
}

export default FormView;
