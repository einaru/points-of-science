import React, { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SmileyOMeter } from "../../../shared/components";
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

  const handleSmileyPress = (score) => {
    console.debug(`User rated challenge ${score}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.shoutOutContainer}>
        <Text style={styles.shoutOut}>{t("Well done!")}</Text>
        <SmileyOMeter
          message={t("What do you think about the challenge?")}
          onPress={handleSmileyPress}
        />
      </View>
      <Button
        style={{ padding: 20 }}
        onPress={() => navigation.navigate("category:list")}
      >
        {t("Up for another challenge?")}
      </Button>
    </View>
  );
}

export default Completed;
