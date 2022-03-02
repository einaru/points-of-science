import React, { useContext, useLayoutEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { getTimestamp } from "../../../shared/timestamp";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import ArgumentConstructor from "./ArgumentConstructor";
import HeaderTitle from "./HeaderTitle";
import styles from "./styles";

function Reflection({ navigation }) {
  const { challenge, setReflectionData } = useContext(ChallengeContext);
  const { reflection, reflectionType } = challenge;

  const [answer, setAnswer] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <HeaderTitle subtitle={t("Reflection")} title={challenge.name} />
        );
      },
    });
  }, [navigation, challenge]);

  const doCompleteReflection = () => {
    setReflectionData(answer, getTimestamp());
    navigation.navigate("challenge:completed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {reflectionType === "argument" ? (
          <ArgumentConstructor
            question={reflection.title}
            choices={reflection.choices}
            onChangeArgument={setAnswer}
          />
        ) : (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Text style={styles.text}>{reflection.title}</Text>
              <TextInput
                style={styles.textarea}
                multiline
                autoFocus
                label={t("Reflection")}
                value={answer}
                onChangeText={setAnswer}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      <Button
        mode="contained"
        style={styles.action}
        onPress={doCompleteReflection}
      >
        {t("Complete challenge")}
      </Button>
    </View>
  );
}

export default Reflection;
