import React from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { Button, Chip, Paragraph } from "react-native-paper";

import { IconBackgroundImage } from "~shared/components";
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {challenge.image ? (
          <ImageBackground
            style={styles.image}
            source={{ uri: challenge.image }}
          >
            {renderMeta()}
          </ImageBackground>
        ) : (
          <IconBackgroundImage
            iconName="lightbulb-on-outline"
            iconSize={104}
            style={styles.image}
          >
            {renderMeta()}
          </IconBackgroundImage>
        )}
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
