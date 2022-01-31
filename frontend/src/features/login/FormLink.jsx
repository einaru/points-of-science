import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import theme from "../../shared/theme";

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    marginTop: 6,
  },
  message: {
    marginEnd: 6,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

function FormLink({ message, label, screenName }) {
  const navigation = useNavigation();
  return (
    <View style={styles.row}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
        <Text style={styles.link}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FormLink;
