import React from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import {
  Chip,
  Surface,
  Text,
  TouchableRipple,
  withTheme,
} from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import colors from "~shared/colors";
import { IconBackgroundImage, NoContent } from "~shared/components";
import { t } from "~shared/i18n";
import Permission from "~shared/permission";

import themedStyles from "./ChallengeList.style";
import { getDifficultyColor } from "./difficulty";

function ChallengeListItem({ challenge, user, theme, onPress }) {
  const styles = themedStyles(theme);

  const isAlreadyCompleted = user.challenges
    .map(({ challengeID }) => challengeID)
    .includes(challenge.id);

  const renderHeader = () => {
    const headerStyle = isAlreadyCompleted
      ? [styles.header, { backgroundColor: colors.green.fade(0.3).string() }]
      : [styles.header];
    return (
      <View style={headerStyle}>
        <Text style={styles.title} numberOfLines={1}>
          {challenge.name}
        </Text>
        {isAlreadyCompleted && (
          <MaterialCommunityIcons
            color={theme.colors.text}
            name="check-decagram"
            size={24}
          />
        )}
      </View>
    );
  };

  const renderDifficulty = () => {
    const color = getDifficultyColor(challenge.difficulty);
    const textStyle = {
      color: color.isLight() ? "#000" : "#fff",
    };
    const style = {
      ...styles.chip,
      backgroundColor: color.string(),
    };
    return (
      <Chip style={style} textStyle={textStyle}>
        {t(challenge.difficulty)}
      </Chip>
    );
  };

  const renderReward = () => {
    if (user.permission === Permission.EXPERIMENT) {
      return (
        <Chip style={styles.chip}>
          {challenge.reward.maxPoints} {t("points")}
        </Chip>
      );
    }
    return null;
  };

  const renderContent = () => {
    return (
      <View style={styles.content}>
        {renderHeader()}
        <View style={styles.meta}>
          {renderDifficulty()}
          {renderReward()}
        </View>
      </View>
    );
  };

  return (
    <Surface style={styles.surface}>
      <TouchableRipple borderless style={styles.ripple} onPress={onPress}>
        {challenge.image ? (
          <ImageBackground
            source={{ uri: challenge.image }}
            style={styles.image}
          >
            {renderContent()}
          </ImageBackground>
        ) : (
          <IconBackgroundImage
            iconName="lightbulb-on-outline"
            iconSize={104}
            style={styles.image}
          >
            {renderContent()}
          </IconBackgroundImage>
        )}
      </TouchableRipple>
    </Surface>
  );
}

function ChallengeList({ route, navigation, theme }) {
  const { category, user } = route.params;
  const { challenges } = category;

  if (!challenges.length) {
    return <NoContent message={t("Couldn't find any challenges")} />;
  }

  const styles = themedStyles(theme);

  return (
    <ScrollView>
      <View style={styles.list}>
        {challenges.map((challenge) => {
          return (
            <ChallengeListItem
              key={challenge.id}
              challenge={challenge}
              user={user}
              theme={theme}
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

export default withTheme(ChallengeList);
