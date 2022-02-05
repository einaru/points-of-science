import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 16,
  },
  linkText: {
    fontWeight: "bold",
  },
});

function FormLink({ message, label, screenName }) {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
        <Text style={{ ...styles.linkText, color: theme.colors.primary }}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default FormLink;
