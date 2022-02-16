import React, { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

function Completed({ navigation }) {
  const challenge = useContext(ChallengeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      <View style={styles.shoutOutContainer}>
        <Text style={styles.shoutOut}>{t("Well done!")}</Text>
        <Button onPress={() => navigation.navigate("category:list")}>
          {t("Up for another challenge?")}
        </Button>
      </View>
    </View>
  );
}

export default Completed;
