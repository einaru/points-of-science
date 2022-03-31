import React from "react";
import { FlatList, ImageBackground, View } from "react-native";
import { Surface, Text, TouchableRipple, withTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "~shared/colors";
import { IconBackgroundImage, NoContent } from "~shared/components";
import { t } from "~shared/i18n";

import themedStyles from "./ChallengeList.style";
import { renderDifficulty, renderReward } from "./Chip";

function ChallengeListItem({ challenge, user, theme, onPress }) {
  const styles = themedStyles(theme);

  // Just one challenge image is render here.
  // The first image in the array is picked as default,
  // falling back on a custom icon image if no images are provided.
  const challengeImage = challenge.images?.[0];

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
          <Icon color={theme.colors.text} name="check-decagram" size={24} />
        )}
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.content}>
        {renderHeader()}
        <View style={styles.meta}>
          {renderDifficulty(challenge)}
          {renderReward(challenge)}
        </View>
      </View>
    );
  };

  return (
    <Surface style={styles.surface}>
      <TouchableRipple borderless style={styles.ripple} onPress={onPress}>
        {challengeImage ? (
          <ImageBackground
            source={{ uri: challengeImage }}
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

  const renderChallenge = ({ item: challenge }) => (
    <ChallengeListItem
      challenge={challenge}
      user={user}
      theme={theme}
      onPress={() => {
        navigation.navigate("challenge:intro", {
          challenge,
        });
      }}
    />
  );

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={challenges}
      renderItem={renderChallenge}
      keyExtractor={(item) => item.id}
    />
  );
}

export default withTheme(ChallengeList);
