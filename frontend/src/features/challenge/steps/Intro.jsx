import React from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { Button, Chip, Paragraph } from "react-native-paper";

import { t } from "~shared/i18n";

import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

const fallbackImage = require("../assets/experiment.jpg");

function Intro({ navigation }) {
  const { challenge } = React.useContext(ChallengeContext);

  const imageSource = challenge.image
    ? { uri: challenge.image }
    : fallbackImage;

  const renderReward = () => {
    return !challenge.reward ? null : (
      <Chip style={styles.chip} mode="outlined">
        {challenge.reward.maxPoints} {t("points")}
      </Chip>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground style={styles.illustrationImage} source={imageSource}>
          <View style={styles.metaContainer}>
            <Chip style={styles.chip}>{challenge.category.name}</Chip>
            {renderReward()}
          </View>
        </ImageBackground>
        <View style={styles.contentContainer}>
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
