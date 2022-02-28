import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  List,
  Paragraph,
  Portal,
} from "react-native-paper";
import * as Linking from "expo-linking";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";
import HeaderTitle from "./HeaderTitle";
import { getTimestamp } from "../../../shared/timestamp";

// Dialog actions
const DISMISS = "dismiss";
const THUMB_UP = "thumb-up";
const THUMB_DOWN = "thumb-down";

function Activity({ navigation }) {
  const dateStarted = getTimestamp();

  const { challenge, setActivityData } = useContext(ChallengeContext);
  const { activity } = challenge;

  const [answer, setAnswer] = useState();
  useEffect(() => {
    if (activity.type === "external") {
      setAnswer(null);
    }
  }, [activity]);

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

  // FIXME Remove/adjust once the resource structure is updated in backend
  const getResourceTitle = (resource) => {
    const title = resource.replace(/^https?:\/\//, "");
    return title.split("/")[0];
  };

  const openResource = (url) => {
    Linking.openURL(url);
    console.debug(`Opening resource ${url}`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <HeaderTitle subtitle={t("Activity")} title={challenge.name} />;
      },
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      {/* TODO render activity content based on activity type */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Paragraph style={styles.text}>{activity.description}</Paragraph>
        </View>
        <View style={styles.helpContainer}>
          <Button onPress={showHint}>{t("Get a hint?")}</Button>
          <Button onPress={showResources}>{t("External resources")}</Button>
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={styles.action}
        onPress={() => {
          setActivityData(answer, dateStarted);
          navigation.navigate("challenge:reflection");
        }}
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
                  style={{ padding: 0 }}
                  title={getResourceTitle(resource)}
                  description={resource}
                  descriptionNumberOfLines={1}
                  right={() => <List.Icon icon="open-in-new" />}
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
