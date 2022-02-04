import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  formAction: {
    marginTop: 12,
    marginBottom: 12,
  },
});

function FormAction({ label, onPress, mode = "contained", loading = false }) {
  return (
    <Button
      mode={mode}
      style={styles.formAction}
      loading={loading}
      onPress={onPress}
    >
      {label}
    </Button>
  );
}
export default FormAction;
