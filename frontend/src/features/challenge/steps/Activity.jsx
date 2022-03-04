import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Paragraph, Portal } from "react-native-paper";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";
import HeaderTitle from "./HeaderTitle";
import { getTimestamp } from "../../../shared/timestamp";
import HintDialog from "./HintDialog";
import ResourceDialog from "./ResourceDialog";

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

  // TODO Keep track of which hints have been shown
  const getAHint = () => {
    const index = hintIndex < hints.length ? hintIndex : 0;
    setHint(hints[index]);
    setHintIndex(index + 1);
  };

  const showHint = () => {
    getAHint();
    setHintIsVisible(true);
  };

  // TODO Log hint action data somehow
  const onHideHint = (action) => {
    setHintIsVisible(false);
    console.debug(`Hint was closed with "${action}"`);
  };

  const { resources } = activity;
  const [resourcesIsVisible, setResourcesIsVisible] = React.useState(false);

  const showResources = () => {
    setResourcesIsVisible(true);
  };

  // TODO Log resource action data somehow
  const onHideResources = (action) => {
    setResourcesIsVisible(false);
    console.debug(`Resources was closed with ${action}`);
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
