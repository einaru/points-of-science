import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";

import { useChallenge } from "~services/content/hooks";
import {
  IconBackgroundImage,
  ImageCarousel,
  MarkdownView,
} from "~shared/components";
import { t } from "~shared/i18n";

import Chip, { renderDifficulty, renderReward } from "../Chip";
import styles from "./styles";

function Intro({ route, navigation }) {
  const { challengeID } = route.params;
  const challenge = useChallenge(challengeID);

  React.useLayoutEffect(() => {
    if (challenge) {
      navigation.setOptions({
        title: challenge.name,
      });
    }
  }, [navigation, challenge]);

  if (!challenge) {
    return null;
  }

  const renderMeta = () => {
    return (
      <View style={styles.meta}>
        <View style={styles.metaRow}>
          <Chip>{challenge.category.name}</Chip>
        </View>
        <View style={styles.metaRow}>
          {renderDifficulty(challenge)}
          {renderReward(challenge)}
        </View>
      </View>
    );
  };

  const renderImages = () => (
    <ImageCarousel images={challenge.images}>{renderMeta()}</ImageCarousel>
  );

  const renderFallbackImage = () => (
    <IconBackgroundImage
      iconName="lightbulb-on-outline"
      iconSize={104}
      style={styles.image}
    >
      {renderMeta()}
    </IconBackgroundImage>
  );

  const doStartChallenge = () => {
    navigation.navigate("challenge:activity", { ...route.params });
  };

  const hasImages = challenge.images?.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView>
        {hasImages ? renderImages() : renderFallbackImage()}
        <View style={styles.content}>
          <MarkdownView>{challenge.description}</MarkdownView>
        </View>
      </ScrollView>
      <Button style={styles.action} mode="contained" onPress={doStartChallenge}>
        {t("Start")}
      </Button>
    </View>
  );
}

export default Intro;
