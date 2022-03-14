import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Paragraph, Portal } from "react-native-paper";

import { t } from "~shared/i18n";
import { getTimestamp } from "~shared/timestamp";

import ChallengeContext from "../ChallengeContext";
import DialogAction from "./DialogAction";
import HeaderTitle from "./HeaderTitle";
import HintDialog from "./HintDialog";
import ResourceDialog from "./ResourceDialog";
import styles from "./styles";

const { DISMISS } = DialogAction;

function Activity({ navigation }) {
  const dateStarted = getTimestamp();

  const { challenge, setActivityData } = React.useContext(ChallengeContext);
  const { activity } = challenge;

  const [answer, setAnswer] = React.useState();
  React.useEffect(() => {
    if (activity.type === "external") {
      setAnswer(null);
    }
  }, [activity]);

  const { hints } = activity;
  const [hint, setHint] = React.useState("");
  const [hintIndex, setHintIndex] = React.useState(0);
  const [hintIsVisible, setHintIsVisible] = React.useState(false);
  const [hasUsedHints, setHasUsedHints] = React.useState(false);
  const [hintResponse, setHintResponse] = React.useState(DISMISS);

  const getAHint = () => {
    const index = hintIndex < hints.length ? hintIndex : 0;
    setHint(hints[index]);
    setHintIndex(index + 1);
  };

  const showHint = () => {
    getAHint();
    setHintIsVisible(true);
    setHasUsedHints(true);
  };

  const onHideHint = (action) => {
    setHintIsVisible(false);
    setHintResponse(action);
  };

  const { resources } = activity;
  const [resourcesIsVisible, setResourcesIsVisible] = React.useState(false);
  const [hasUsedResources, setHasUsedResources] = React.useState(false);
  const [resourcesResponse, setResourcesResponse] = React.useState(DISMISS);

  const showResources = () => {
    setResourcesIsVisible(true);
    setHasUsedResources(true);
  };

  const onHideResources = (action) => {
    setResourcesIsVisible(false);
    setResourcesResponse(action);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <HeaderTitle subtitle={t("Activity")} title={challenge.name} />;
      },
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      {/* TODO render activity content based on activity type */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <Paragraph style={styles.text}>{activity.description}</Paragraph>
        </View>
        <View style={styles.help}>
          <Button onPress={showHint}>{t("Get a hint?")}</Button>
          <Button onPress={showResources}>{t("External resources")}</Button>
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={styles.action}
        onPress={() => {
          setActivityData(
            answer,
            dateStarted,
            hasUsedHints,
            hintResponse,
            hasUsedResources,
            resourcesResponse
          );
          navigation.navigate("challenge:reflection");
        }}
      >
        {t("Continue")}
      </Button>
      <Portal>
        <HintDialog
          hint={hint}
          visible={hintIsVisible}
          onDismiss={onHideHint}
        />
        <ResourceDialog
          resources={resources}
          visible={resourcesIsVisible}
          onDismiss={onHideResources}
        />
      </Portal>
    </View>
  );
}

export default Activity;
