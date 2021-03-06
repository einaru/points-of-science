import { useMutation } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  BackHandler,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { Button, Surface, Text, withTheme } from "react-native-paper";

import ContentContext from "~services/content/ContentContext";
import Sentry from "~services/sentry";
import {
  HeroBackgroundImage,
  LoadingScreen,
  SmileyOMeter,
} from "~shared/components";
import { t } from "~shared/i18n";
import Permission from "~shared/permission";

import ChallengeContext from "../ChallengeContext";
import { ADD_USER_CHALLENGE, ADD_USER_CHALLENGE_RATING } from "./Completed.gql";
import themedStyles from "./Completed.style";

const Direction = {
  IN: "in",
  OUT: "out",
};

function Completed({ route, navigation, theme }) {
  const { challengeID } = route.params;
  const { user } = React.useContext(ContentContext);
  const { userData } = React.useContext(ChallengeContext);
  const { width: windowWidth } = useWindowDimensions();

  const [reward, setReward] = React.useState({ points: 0, bonusPoints: 0 });
  const [addUserChallenge, { called, loading }] = useMutation(
    ADD_USER_CHALLENGE,
    {
      onError: (error) => {
        Sentry.captureException(error);
      },
      onCompleted: (data) => {
        if (data?.addUserChallenge.reward) {
          setReward(data.addUserChallenge.reward);
        }
      },
    }
  );

  React.useEffect(() => {
    if (!called) {
      addUserChallenge({
        variables: {
          data: {
            challengeID,
            activity: {
              dateStarted: userData.dateStarted,
              answer: userData.activityAnswer,
              hasOpenHints: userData.hasUsedHints,
              hintResponse: userData.hintResponse,
              hasOpenResources: userData.hasUsedResources,
              resourcesResponse: userData.resourcesResponse,
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

  const [isRated, setIsRated] = React.useState(false);
  const [addChallengeRating] = useMutation(ADD_USER_CHALLENGE_RATING, {
    onError: (error) => {
      Sentry.captureException(error);
    },
  });

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

  const handleSmileyPress = (score, label) => {
    setIsRated(true);
    slide(Direction.OUT, 350);
    addChallengeRating({
      variables: {
        rating: {
          challengeID,
          dateCompleted: userData.dateCompleted,
          label,
          score,
        },
      },
    });
  };

  if (!isRated) {
    slide(Direction.IN, 250);
  }

  const styles = themedStyles(theme);

  const renderReward = () => {
    if (user.permission !== Permission.EXPERIMENT) {
      return null;
    }

    const renderPoints = (points) => {
      const label = points === 1 ? t("point") : t("points");
      return <Text style={styles.points}>{`${points} ${label}`}</Text>;
    };

    const renderBonusPoints = (points) => {
      const label = points === 1 ? t("bonus point") : t("bonus points");
      return <Text style={styles.bonusPoints}>{`+${points} ${label}`}</Text>;
    };

    const { points, bonusPoints } = reward;

    return (
      <View style={styles.rewardContainer}>
        {points > 0 && renderPoints(points)}
        {bonusPoints > 0 && renderBonusPoints(bonusPoints)}
      </View>
    );
  };

  if (loading) {
    return <LoadingScreen loading={loading} />;
  }

  return (
    <View style={styles.container}>
      <HeroBackgroundImage name="graduation" fade={0.5}>
        <ScrollView contentContainerStyle={styles.scroll}>
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
                          outputRange: [-windowWidth, 0],
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
        </ScrollView>
      </HeroBackgroundImage>
    </View>
  );
}

export default withTheme(Completed);
