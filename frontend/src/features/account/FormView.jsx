import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./FormView.style";

function FormView({ children }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>{children}</View>
    </ScrollView>
  );
}

export default FormView;
