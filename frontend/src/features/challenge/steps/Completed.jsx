import React from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  ScrollView,
  View,
} from "react-native";
import {
  Button,
  IconButton,
  Surface,
  Text,
  withTheme,
} from "react-native-paper";
import { useMutation } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import ContentContext from "../../../services/content/ContentContext";
import {
  HeroBackgroundImage,
  LoadingScreen,
  SmileyOMeter,
} from "../../../shared/components";
import Permission from "../../../shared/permission";
import { t } from "../../i18n";
import ChallengeContext from "../ChallengeContext";
import ADD_USER_CHALLENGE from "./Completed.gql";
import themedStyles from "./Completed.style";

const Direction = {
  IN: "in",
  OUT: "out",
};

function Completed({ navigation, theme }) {
  const { user } = React.useContext(ContentContext);
  const { challenge, userData } = React.useContext(ChallengeContext);
  const [addUserChallenge, { called, loading }] = useMutation(
    ADD_USER_CHALLENGE,
    {
      onError: (error) => {
        console.debug("Error adding user challenge:", error);
      },
    }
  );

  React.useEffect(() => {
    if (!called) {
      addUserChallenge({
        variables: {
          data: {
            challengeID: challenge.id,
            activity: {
              dateStarted: userData.dateStarted,
              answer: userData.activityAnswer,
            },
            reflection: {
              dateCompleted: userData.dateCompleted,
              answer: userData.reflectionAnswer,
            },
          },
        },
      });
    }
  });

  // The challenge is considered completed when we reach this screen.
  // In order to prevent going back through the various challenge step screens,
  // we navigate to the category list screen when users wants to "go back".
  const goBack = React.useCallback(() => {
    navigation.navigate("category:list");
  }, [navigation]);

  // Override the hardware back action on Android and send users to the screen
  // indicated in the goBack function above.
  useFocusEffect(
    React.useCallback(() => {
      const handler = BackHandler.addEventListener("hardwareBackPress", () => {
        goBack();
        return true;
      });
      return () => handler.remove();
    }, [goBack])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.name,
      headerLeft: () => <IconButton icon="check" onPress={goBack} />,
    });
  }, [navigation, challenge, goBack]);

  const slideFrom = React.useRef(new Animated.Value(0)).current;

  const slide = React.useCallback(
    (direction, duration) => {
      const [from, to] = direction === Direction.IN ? [0, 1] : [1, 0];
      slideFrom.current = from;
      Animated.timing(slideFrom, {
        duration,
        toValue: to,
        useNativeDriver: true,
      }).start();
    },
    [slideFrom]
  );

  React.useEffect(() => {
    slide(Direction.IN, 350);
  });

  const handleSmileyPress = (score) => {
    console.debug(`User rated challenge ${score}`);
    slide(Direction.OUT, 350);
  };

  const hasAnsweredCorrect = () => {
    const activitySolution = challenge.activity?.solution ?? null;
    const reflectionSolution = challenge.reflection.solution;
    return (
      reflectionSolution === userData.reflectionAnswer &&
      activitySolution === userData.activityAnswer
    );
  };

  const calculatePoints = () => {
    if (user.permission !== Permission.EXPERIMENT) {
      return null;
    }

    const userChallenge = user.challenges.filter(
      ({ challengeID }) => challengeID === challenge.id
    )[0];
    const isFirstTry = userChallenge === undefined;

    let points = 0;
    const { firstTryPoints, maxPoints, bonusPoints } = challenge.reward;

    if (isFirstTry) {
      points += firstTryPoints;
      if (hasAnsweredCorrect()) {
        points += maxPoints + bonusPoints;
      }
    } else if (!userChallenge.answeredCorrect && hasAnsweredCorrect) {
      points += maxPoints;
    }

    return points;
  };

  const styles = themedStyles(theme);

  const renderReward = () => {
    const points = calculatePoints();
    return points ? (
      <View style={styles.rewardContainer}>
        <Text style={styles.rewardTitle}>{points}</Text>
        <Text style={styles.rewardSubtitle}>{t("points")}</Text>
      </View>
    ) : null;
  };

  if (loading) {
    return (
      <LoadingScreen loading={loading} message={t("Calculating points…")} />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <HeroBackgroundImage name="graduation">
          <View style={styles.backgroundOverlay}>
            <View style={styles.shoutOutContainer}>
              {renderReward()}
              <Text style={styles.shoutOut}>{t("Well done!")}</Text>
            </View>
            <View>
              <Surface
                style={[
                  styles.surface,
                  {
                    transform: [
                      {
                        translateX: slideFrom.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-Dimensions.get("window").width, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <SmileyOMeter
                  message={t("What do you think about the challenge?")}
                  onPress={handleSmileyPress}
                />
              </Surface>
              <Button style={styles.action} onPress={goBack}>
                {t("Up for another challenge?")}
              </Button>
            </View>
          </View>
        </HeroBackgroundImage>
      </ScrollView>
    </View>
  );
}

export default withTheme(Completed);
