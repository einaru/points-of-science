import React, { useContext } from "react";
import { Image, View } from "react-native";
import { Text, TouchableRipple, withTheme } from "react-native-paper";
import themedStyles from "./CategoryList.style";
import { NoContent, Surface } from "../../../shared/components";
import ContentContext from "../../../services/content/ContentContext";
import { t } from "../../i18n";
import ProgressBar from "./ProgressBar";
import Permission from "../../../shared/permission";

const fallbackImage = require("../assets/category.png");

function CategoryListItem({ category, user, onPress, theme }) {
  const styles = themedStyles(theme);

  const imageSource = category.image ? { uri: category.image } : fallbackImage;
  const challengeIDs = category.challenges.map((item) => item.id);
  const numChallenges = category.challenges.length;
  const numUserChallenges = user.challenges.filter(({ challengeID }) =>
    challengeIDs.includes(challengeID)
  ).length;

  const numChallengesLabel = `${numChallenges} ${
    numChallenges === 1 ? t("challenge") : t("challenges")
  }`;

  const renderProgress = () => {
    if (user.permission === Permission.EXPERIMENT) {
      const progress = category.progress.percentage;
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
  const { categories, user } = useContext(ContentContext);

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
