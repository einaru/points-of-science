import React from "react";
import { ScrollView, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import styles from "./ChallengeList.style";

const fallbackImage = require("./assets/challenge.png");

function ChallengeListItem({ challenge, onPress }) {
  const imageSource = challenge.image
    ? { uri: challenge.image }
    : fallbackImage;
  return (
    <Card onPress={onPress} style={styles.listItem}>
      <Card.Title title={challenge.name} />
      <Card.Cover style={styles.listItemCover} source={imageSource} />
      <Card.Content style={styles.listItemContent}>
        <Chip mode="outlined" style={styles.chip}>
          {challenge.difficulty.name}
        </Chip>
        <Chip mode="outlined" style={styles.chip}>
          {challenge.points} points
        </Chip>
      </Card.Content>
    </Card>
  );
}

function ChallengeList({ route, navigation }) {
  const { category } = route.params;
  const { challenges } = category;

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
