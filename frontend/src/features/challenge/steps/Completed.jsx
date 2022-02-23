import React, { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SmileyOMeter } from "../../../shared/components";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import styles from "./styles";

function Reward({ title, subtitle }) {
  return (
    <View style={styles.rewardContainer}>
      <Text style={styles.rewardTitle}>{title}</Text>
      <Text style={styles.rewardSubtitle}>{subtitle}</Text>
    </View>
  );
}

function Completed({ navigation }) {
  const challenge = useContext(ChallengeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
    });
  }, [navigation, challenge]);

  const handleSmileyPress = (score) => {
    console.debug(`User rated challenge ${score}`);
  };

  // FIXME Properly calculate points for the challenge
  const calculatePoints = () => {
    const points = challenge.reward.maxPoints;
    if (points === 0) {
      return points;
    }
    return points > 0 ? `+${points}` : `-${points}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.shoutOutContainer}>
        {challenge.reward ? (
          <Reward title={calculatePoints()} subtitle={t("points")} />
        ) : null}
        <Text style={styles.shoutOut}>{t("Well done!")}</Text>
        <SmileyOMeter
          message={t("What do you think about the challenge?")}
          onPress={handleSmileyPress}
        />
      </View>
      <Button
        style={{ padding: 20 }}
        onPress={() => navigation.navigate("category:list")}
      >
        {t("Up for another challenge?")}
      </Button>
    </View>
  );
}

export default Completed;
