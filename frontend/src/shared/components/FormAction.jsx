import React from "react";
import { Keyboard } from "react-native";
import { Button } from "react-native-paper";

function FormAction({
  label,
  onPress,
  mode = "contained",
  loading = false,
  disabled = false,
  dismissKeyboard = true,
}) {
  const handleOnPress = () => {
    if (dismissKeyboard) {
      Keyboard.dismiss();
    }
    onPress();
  };
  return (
    <Button
      mode={mode}
      style={{ marginTop: 8 }}
      loading={loading}
      disabled={disabled}
      onPress={handleOnPress}
    >
      {label}
    </Button>
  );
}
export default FormAction;
