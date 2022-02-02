import React, { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

function Activity({ navigation }) {
  const challenge = useContext(ChallengeContext);
  const { activity } = challenge;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Title style={styles.title}>{t("Activity")}</Title>
        <Paragraph style={styles.text}>{activity.description}</Paragraph>
      </View>
      <View style={styles.helpContainer}>
        <Button
          onPress={() => {
            console.log("Get a hint…");
          }}
        >
          {t("Get a hint?")}
        </Button>
        <Button
          onPress={() => {
            console.log("Watch a video…");
          }}
        >
          {t("Watch a video")}
        </Button>
      </View>
      <Button
        mode="contained"
        style={styles.action}
        onPress={() => navigation.navigate("challenge:reflection")}
      >
        {t("Continue")}
      </Button>
    </View>
  );
}

export default Activity;
