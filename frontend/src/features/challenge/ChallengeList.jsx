import React from "react";
import { Image, ScrollView, View } from "react-native";
import { Chip, Title, TouchableRipple } from "react-native-paper";
import { NoContent, Surface } from "../../shared/components";
import { t } from "../i18n";
import styles from "./ChallengeList.style";

const fallbackImage = require("./assets/challenge.png");

function ChallengeListItem({ challenge, onPress }) {
  const imageSource = challenge.image
    ? { uri: challenge.image }
    : fallbackImage;
  return (
    <Surface style={styles.surface}>
      <TouchableRipple onPress={onPress}>
        <View>
          <Title style={styles.title}>{challenge.name}</Title>
          <Image style={styles.image} source={imageSource} />
          <View style={styles.metaContainer}>
            <Chip style={styles.chip} mode="outlined">
              {challenge.difficulty}
            </Chip>
            <Chip style={styles.chip} mode="outlined">
              {challenge.reward.maxPoints} points
            </Chip>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
}

function ChallengeList({ route, navigation }) {
  const { category } = route.params;
  const { challenges } = category;

  if (!challenges.length) {
    return <NoContent message={t("Couldn't find any challenges")} />;
  }

  return (
    <ScrollView>
      <View style={styles.listContainer}>
        {challenges.map((challenge) => {
          return (
            <ChallengeListItem
              key={challenge.id}
              challenge={challenge}
              onPress={() => {
                navigation.navigate("challenge:main", {
                  challenge,
                });
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

export default ChallengeList;
