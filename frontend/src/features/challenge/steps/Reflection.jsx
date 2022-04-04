import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { useChallenge } from "~services/content/hooks";
import { t } from "~shared/i18n";
import { getTimestamp } from "~shared/timestamp";

import ChallengeContext from "../ChallengeContext";
import ArgumentConstructor from "./ArgumentConstructor";
import HeaderTitle from "./HeaderTitle";
import OpenReflection from "./OpenReflection";
import styles from "./styles";

function Reflection({ route, navigation }) {
  const { challengeID } = route.params;
  const challenge = useChallenge(challengeID);

  const [answer, setAnswer] = React.useState("");

  React.useLayoutEffect(() => {
    if (challenge) {
      navigation.setOptions({
        headerTitle: () => {
          return (
            <HeaderTitle title={challenge.name} subtitle={t("Reflection")} />
          );
        },
      });
    }
  }, [navigation, challenge]);

  const { setReflectionData } = React.useContext(ChallengeContext);

  if (!challenge) {
    return null;
  }

  const { reflection } = challenge;

  const doCompleteReflection = () => {
    setReflectionData(answer, getTimestamp());
    navigation.navigate("challenge:completed", { ...route.params });
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
