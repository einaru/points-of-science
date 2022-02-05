import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import theme from "../../shared/theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 16,
  },
  linkText: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

function FormLink({ message, label, screenName }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
        <Text style={styles.linkText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FormLink;
