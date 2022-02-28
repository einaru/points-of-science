import React, { useContext, useLayoutEffect } from "react";
import { ImageBackground, View, ScrollView } from "react-native";
import { Button, Chip, Paragraph } from "react-native-paper";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

const fallbackImage = require("../assets/experiment.jpg");

function Intro({ navigation }) {
  const { challenge } = useContext(ChallengeContext);

  const imageSource = challenge.image
    ? { uri: challenge.image }
    : fallbackImage;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground style={styles.illustrationImage} source={imageSource}>
          <View style={styles.metaContainer}>
            {/* FIXME Provide challenge name from backend */}
            <Chip style={styles.chip}>{challenge.categoryID}</Chip>
            <Chip style={styles.chip}>
              {challenge.reward.maxPoints} {t("points")}
            </Chip>
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
