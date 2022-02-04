import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    margin: 24,
    justifyContent: "center",
  },
});

function FormView({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>{children}</View>
    </SafeAreaView>
  );
}

export default FormView;
