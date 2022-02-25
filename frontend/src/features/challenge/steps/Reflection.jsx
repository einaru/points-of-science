import React, { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import ArgumentConstructor from "./ArgumentConstructor";
import HeaderTitle from "./HeaderTitle";
import styles from "./styles";

function Reflection({ navigation }) {
  const challenge = useContext(ChallengeContext);
  const { reflection, reflectionType } = challenge;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <HeaderTitle subtitle={t("Reflection")} title={challenge.name} />
        );
      },
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {reflectionType === "argument" ? (
          <ArgumentConstructor
            question={reflection.title}
            choices={reflection.choices}
          />
        ) : (
          <>
            <Text style={styles.text}>{reflection.title}</Text>
            <TextInput
              style={styles.textarea}
              multiline
              autoFocus
              label={t("Reflection")}
            />
          </>
        )}
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
