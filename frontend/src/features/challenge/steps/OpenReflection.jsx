import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { HeroImage } from "../../../shared/components";
import { t } from "../../i18n";
import styles from "./OpenReflection.style";

export default function OpenReflection({ title, onChange }) {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
    onChange(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <HeroImage name="science" />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={{ flex: 1 }}
          multiline
          autoFocus
          label={t("Reflection")}
          value={text}
          onChangeText={handleChange}
        />
      </View>
    </ScrollView>
  );
}
