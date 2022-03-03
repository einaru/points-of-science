import React, { useContext, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { getTimestamp } from "../../../shared/timestamp";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import ArgumentConstructor from "./ArgumentConstructor";
import HeaderTitle from "./HeaderTitle";
import OpenReflection from "./OpenReflection";
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
      {reflectionType === "argument" ? (
        <ArgumentConstructor
          question={reflection.title}
          choices={reflection.choices}
          onChangeArgument={setAnswer}
        />
      ) : (
        <OpenReflection title={reflection.title} onChange={setAnswer} />
      )}
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
