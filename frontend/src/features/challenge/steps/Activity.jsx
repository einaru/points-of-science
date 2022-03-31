import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Portal } from "react-native-paper";

import AnalyticsContext from "~services/analytics/AnalyticsContext";
import ContentContext from "~services/content/ContentContext";
import { MarkdownView } from "~shared/components";
import { t } from "~shared/i18n";
import { getTimestamp } from "~shared/timestamp";

import ChallengeContext from "../ChallengeContext";
import DialogAction from "./DialogAction";
import HeaderTitle from "./HeaderTitle";
import HintDialog from "./HintDialog";
import ResourceDialog from "./ResourceDialog";
import styles from "./styles";

const { DISMISS } = DialogAction;

function Activity({ route, navigation }) {
  const dateStarted = getTimestamp();

  const { challengeID } = route.params;
  const { getChallenge } = React.useContext(ContentContext);
  const challenge = getChallenge(challengeID);

  const { logClickEvent } = React.useContext(AnalyticsContext);
  const { setActivityData } = React.useContext(ChallengeContext);
  const { activity } = challenge;

  const [answer, setAnswer] = React.useState();
  React.useEffect(() => {
    if (activity.type === "external") {
      setAnswer(null);
    }
  }, [activity]);

  const { hints } = activity;
  const hasHints = hints.length > 0;
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
    logClickEvent(route, "Hints dialog opened");
    getAHint();
    setHintIsVisible(true);
    setHasUsedHints(true);
  };

  const onHideHint = (action) => {
    logClickEvent(route, `Hints dialog dismissed: ${action}`);
    setHintIsVisible(false);
    setHintResponse(action);
  };

  const { resources } = activity;
  const hasResources = resources.length > 0;
  const [resourcesIsVisible, setResourcesIsVisible] = React.useState(false);
  const [hasUsedResources, setHasUsedResources] = React.useState(false);
  const [resourcesResponse, setResourcesResponse] = React.useState(DISMISS);

  const showResources = () => {
    logClickEvent(route, "Resources dialog opened");
    setResourcesIsVisible(true);
    setHasUsedResources(true);
  };

  const onHideResources = (action) => {
    logClickEvent(route, `Resources dialog dismissed: ${action}`);
    setResourcesIsVisible(false);
    setResourcesResponse(action);
  };

  const onResourceVisited = (resource) => {
    logClickEvent(route, `Resource visited: ${resource}`);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <HeaderTitle subtitle={t("Activity")} title={challenge.name} />;
      },
    });
  }, [navigation, challenge]);

  const doCompleteActivity = () => {
    setActivityData(
      answer,
      dateStarted,
      hasUsedHints,
      hintResponse,
      hasUsedResources,
      resourcesResponse
    );
    navigation.navigate("challenge:reflection", { challengeID });
  };

  return (
    <View style={styles.container}>
      {/* TODO render activity content based on activity type */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <MarkdownView>{activity.description}</MarkdownView>
        </View>
        <View style={styles.help}>
          {hasHints && <Button onPress={showHint}>{t("Get a hint?")}</Button>}
          {hasResources && (
            <Button onPress={showResources}>{t("External resources")}</Button>
          )}
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={styles.action}
        onPress={doCompleteActivity}
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
          onResourceVisited={onResourceVisited}
        />
      </Portal>
    </View>
  );
}

export default Activity;
