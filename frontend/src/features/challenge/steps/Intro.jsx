import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Chip } from "react-native-paper";

import {
  IconBackgroundImage,
  ImageCarousel,
  MarkdownView,
} from "~shared/components";
import { t } from "~shared/i18n";

import ChallengeContext from "../ChallengeContext";
import { getDifficultyColor } from "../difficulty";
import styles from "./styles";

function Intro({ navigation }) {
  const { challenge } = React.useContext(ChallengeContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

  const renderDifficulty = () => {
    const color = getDifficultyColor(challenge.difficulty);
    const textStyle = {
      color: color.isLight()
        ? color.darken(0.6).string()
        : color.lighten(0.6).string(),
    };
    const style = {
      ...styles.chip,
      backgroundColor: color.string(),
    };
    return (
      <Chip style={style} textStyle={textStyle}>
        {t(challenge.difficulty)}
      </Chip>
    );
  };

  const renderReward = () => {
    return !challenge.reward ? null : (
      <Chip style={styles.chip} mode="outlined">
        {challenge.reward.maxPoints} {t("points")}
      </Chip>
    );
  };

  const renderMeta = () => {
    return (
      <View style={styles.meta}>
        <View style={styles.metaRow}>
          <Chip style={styles.chip} mode="outlined">
            {challenge.category.name}
          </Chip>
        </View>
        <View style={styles.metaRow}>
          {renderDifficulty()}
          {renderReward()}
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

  const hasImages = challenge.images?.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {hasImages ? renderImages() : renderFallbackImage()}
        <View style={styles.content}>
          <MarkdownView>{challenge.description}</MarkdownView>
        </View>
      </ScrollView>
      <Button
        style={styles.action}
        mode="contained"
        onPress={() => navigation.navigate("challenge:activity")}
      >
        {t("Start")}
      </Button>
    </View>
  );
}

export default Intro;
