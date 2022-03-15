import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Chip, Paragraph } from "react-native-paper";

import { IconBackgroundImage, ImageCarousel } from "~shared/components";
import { t } from "~shared/i18n";

import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

function Intro({ navigation }) {
  const { challenge } = React.useContext(ChallengeContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

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
        <Chip style={styles.chip} mode="outlined">
          {challenge.category.name}
        </Chip>
        {renderReward()}
      </View>
    );
  };

  const renderImages = () => (
    <ImageCarousel images={challenge.images} height={150}>
      {renderMeta()}
    </ImageCarousel>
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
          <Paragraph>{challenge.description}</Paragraph>
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
