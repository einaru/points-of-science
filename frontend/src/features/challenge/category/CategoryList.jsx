import React from "react";
import { Image, View } from "react-native";
import { Surface, Text, TouchableRipple, withTheme } from "react-native-paper";

import ContentContext from "~services/content/ContentContext";
import { NoContent } from "~shared/components";
import { t } from "~shared/i18n";
import Permission from "~shared/permission";

import themedStyles from "./CategoryList.style";
import ProgressBar from "./ProgressBar";

const fallbackImage = require("../assets/category.png");

function CategoryListItem({ category, user, onPress, theme }) {
  const styles = themedStyles(theme);

  const progress = React.useMemo(() => {
    return user.progress.categories
      .filter(({ id }) => id === category.id)
      .reduce((_, item) => {
        return item.progress || 0;
      }, 0);
  }, [category, user.progress.categories]);

  const imageSource = category.image ? { uri: category.image } : fallbackImage;
  const challengeIDs = category.challenges.map((item) => item.id);
  const numChallenges = category.challenges.length;
  const numUserChallenges = Array.from(
    new Set(user.challenges.map(({ challengeID }) => challengeID))
  ).filter((id) => challengeIDs.includes(id)).length;

  const numChallengesLabel = `${numChallenges} ${
    numChallenges === 1 ? t("challenge") : t("challenges")
  }`;

  const renderProgress = () => {
    if (user.permission === Permission.EXPERIMENT) {
      return (
        <>
          <View style={styles.progressRow}>
            <Text>
              {numUserChallenges} {t("of")} {numChallengesLabel}
            </Text>
            <Text>{`(${progress * 100}%)`}</Text>
          </View>
          <ProgressBar progress={progress} />
        </>
      );
    }
    return <Text>{numChallengesLabel}</Text>;
  };

  return (
    <Surface style={styles.surface}>
      <TouchableRipple borderless style={styles.ripple} onPress={onPress}>
        <View style={styles.item}>
          <Image style={styles.image} source={imageSource} />
          <View style={styles.content}>
            <Text style={styles.title}>{category.name}</Text>
            {renderProgress()}
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
}

function CategoryList({ navigation, theme }) {
  const { categories, user } = React.useContext(ContentContext);

  if (!categories.length) {
    return <NoContent message={t("Couldn't find any content")} />;
  }

  const styles = themedStyles(theme);

  return (
    <View style={styles.list}>
      {categories.map((category) => {
        return (
          <CategoryListItem
            key={category.id}
            category={category}
            user={user}
            theme={theme}
            onPress={() => {
              navigation.navigate("category:challenge-list", {
                category,
                user,
              });
            }}
          />
        );
      })}
    </View>
  );
}

export default withTheme(CategoryList);
