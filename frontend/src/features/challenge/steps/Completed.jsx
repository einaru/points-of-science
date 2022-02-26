import React, { useCallback, useContext, useLayoutEffect } from "react";
import { BackHandler, ScrollView, View } from "react-native";
import { Button, IconButton, Surface, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
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

  // The challenge is considered completed when we reach this screen.
  // In order to prevent going back through the various challenge step screens,
  // we navigate to the category list screen when users wants to "go back".
  const goBack = useCallback(() => {
    navigation.navigate("category:list");
  }, [navigation]);

  // Override the hardware back action on Android and send users to the screen
  // indicated in the goBack function above.
  useFocusEffect(
    useCallback(() => {
      const handler = BackHandler.addEventListener("hardwareBackPress", () => {
        goBack();
        return true;
      });
      return () => handler.remove();
    }, [goBack])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
      headerLeft: () => <IconButton icon="check" onPress={goBack} />,
    });
  }, [navigation, challenge, goBack]);

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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.shoutOutContainer}>
          {challenge.reward ? (
            <Reward title={calculatePoints()} subtitle={t("points")} />
          ) : null}
          <Text style={styles.shoutOut}>{t("Well done!")}</Text>
        </View>
        <View>
          <Surface style={styles.surface}>
            <SmileyOMeter
              message={t("What do you think about the challenge?")}
              onPress={handleSmileyPress}
            />
          </Surface>
          <Button style={styles.action} onPress={goBack}>
            {t("Up for another challenge?")}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

export default Completed;
