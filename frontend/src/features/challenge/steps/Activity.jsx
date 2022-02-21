import React, { useContext, useLayoutEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  List,
  Paragraph,
  Portal,
  Title,
} from "react-native-paper";
import * as Linking from "expo-linking";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

// Dialog actions
const DISMISS = "dismiss";
const THUMB_UP = "thumb-up";
const THUMB_DOWN = "thumb-down";

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

  // TODO Log hint action data somehow
  const hideHint = (action) => {
    setHintIsVisible(false);
    console.debug(`Hint was closed with "${action}"`);
  };

  const { resources } = activity;
  const [resourcesIsVisible, setResourcesIsVisible] = useState(false);

  const showResources = () => {
    setResourcesIsVisible(true);
  };

  // TODO Log resource action data somehow
  const hideResources = (action) => {
    setResourcesIsVisible(false);
    console.debug(`Resources was closed with ${action}`);
  };

  const openResource = (url) => {
    Linking.openURL(url);
    console.debug(`Opening resource ${url}`);
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
        <Button onPress={showResources}>{t("External resources")}</Button>
      </View>
      <Button
        mode="contained"
        style={styles.action}
        onPress={() => navigation.navigate("challenge:reflection")}
      >
        {t("Continue")}
      </Button>
      <Portal>
        <Dialog visible={hintIsVisible} onDismiss={() => hideHint(DISMISS)}>
          <Dialog.Title>{t("Here's a little hint")}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{hint}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <IconButton
              icon="thumb-down"
              onPress={() => hideHint(THUMB_DOWN)}
            />
            <IconButton icon="thumb-up" onPress={() => hideHint(THUMB_UP)} />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={resourcesIsVisible}
          onDismiss={() => hideResources(DISMISS)}
        >
          <Dialog.Title>{t("External resources")}</Dialog.Title>
          <Dialog.Content>
            {resources.map((resource) => {
              return (
                <List.Item
                  key={resource}
                  title={resource}
                  onPress={() => openResource(resource)}
                />
              );
            })}
          </Dialog.Content>
          <Dialog.Actions>
            <IconButton
              icon="thumb-down"
              onPress={() => hideResources(THUMB_DOWN)}
            />
            <IconButton
              icon="thumb-up"
              onPress={() => hideResources(THUMB_UP)}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default Activity;
