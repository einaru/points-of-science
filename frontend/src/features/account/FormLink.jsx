import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styles from "./FormLink.style";

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
