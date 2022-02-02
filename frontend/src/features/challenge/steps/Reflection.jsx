import React, { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

function Reflection({ navigation }) {
  const challenge = useContext(ChallengeContext);
  const { reflection } = challenge;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Title style={styles.title}>{t("Reflection")}</Title>
        <Text style={styles.text}>{reflection.question}</Text>
        <TextInput style={styles.textarea} multiline />
      </View>
      <Button
        mode="contained"
        style={styles.action}
        onPress={() => navigation.navigate("challenge:completed")}
      >
        {t("Complete challenge")}
      </Button>
    </View>
  );
}

export default Reflection;
