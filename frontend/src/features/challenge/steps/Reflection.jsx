import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { t } from "~shared/i18n";
import { getTimestamp } from "~shared/timestamp";

import ChallengeContext from "../ChallengeContext";
import ArgumentConstructor from "./ArgumentConstructor";
import HeaderTitle from "./HeaderTitle";
import OpenReflection from "./OpenReflection";
import styles from "./styles";

function Reflection({ route, navigation }) {
  const { setReflectionData } = React.useContext(ChallengeContext);
  const { challenge } = route.params;
  const { reflection } = challenge;

  const [answer, setAnswer] = React.useState("");

  React.useLayoutEffect(() => {
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
    navigation.navigate("challenge:completed", { challenge });
  };

  return (
    <View style={styles.container}>
      {reflection.reflectionType === "argument" ? (
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
