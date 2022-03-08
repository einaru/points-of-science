import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import styles from "./FormView.style";

function FormView({ children }) {
  const renderView = () => {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>{children}</View>
      </ScrollView>
    );
  };

  // Need to wrap the ScrollView in a KeyboardAvoidingView on iOS so the
  // keyboard won't hide the input fields and buttons. This is not an issue on
  // Android, in fact it works much better without the KeyboardAvoidingView.
  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {renderView()}
    </KeyboardAvoidingView>
  ) : (
    renderView()
  );
}

export default FormView;
