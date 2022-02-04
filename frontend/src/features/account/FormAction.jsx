import React from "react";
import { Button } from "react-native-paper";

function FormAction({
  label,
  onPress,
  mode = "contained",
  loading = false,
  disabled = false,
}) {
  return (
    <Button
      mode={mode}
      style={{ marginTop: 8 }}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
    >
      {label}
    </Button>
  );
}
export default FormAction;
