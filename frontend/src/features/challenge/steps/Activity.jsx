import React, { useContext, useLayoutEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  Title,
} from "react-native-paper";
import * as Linking from "expo-linking";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

function Activity({ navigation }) {
  const challenge = useContext(ChallengeContext);
  const { activity } = challenge;
  const { hints } = activity;

  const [hint, setHint] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [hintIsVisible, setHintIsVisible] = useState(false);

  // TODO Keep track of which hints have been shown
  const getAHint = () => {
    const index = hintIndex < hints.length ? hintIndex : 0;
    setHint(hints[index]);
    setHintIndex(index + 1);
  };

  const showHint = () => {
    setHintIsVisible(true);
    getAHint();
  };

  const hideHint = (thumbUp) => {
    setHintIsVisible(false);
    console.log(`The hint was ${thumbUp ? "good \\o/" : "bad /o\\"}`);
  };

  const openExternalResource = () => {
    const { resources } = activity;
    if (resources && resources.length > 0) {
      Linking.openURL(resources[0].url);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      {/* TODO render activity content based on activity type */}
      <ScrollView>
        <View style={styles.contentContainer}>
          <Title style={styles.title}>{t("Activity")}</Title>
          <Paragraph style={styles.text}>{activity.description}</Paragraph>
        </View>
      </ScrollView>
      <View style={styles.helpContainer}>
        <Button onPress={showHint}>{t("Get a hint?")}</Button>
        <Button onPress={openExternalResource}>{t("Watch a video")}</Button>
      </View>
      <Button
        mode="contained"
        style={styles.action}
        onPress={() => navigation.navigate("challenge:reflection")}
      >
        {t("Continue")}
      </Button>
      <Portal>
        <Dialog visible={hintIsVisible} onDismiss={hideHint}>
          <Dialog.Title>{t("Here's a little hint")}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{hint}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <IconButton icon="thumb-down" onPress={() => hideHint(false)} />
            <IconButton icon="thumb-up" onPress={() => hideHint(true)} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default Activity;
