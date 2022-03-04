import React from "react";
import { Dimensions, FlatList } from "react-native";
import { Portal } from "react-native-paper";

import ContentContext from "~services/content/ContentContext";
import HeroBackgroundImage from "~shared/components/HeroBackgroundImage";

import Achievement from "./Achievement";
import AchievementInfo from "./AchievementInfo";

function AchievementList() {
  const { achievements } = React.useContext(ContentContext);

  const [achievement, setAchievement] = React.useState();
  const [infoIsVisible, setInfoIsVisible] = React.useState(false);

  const showInfo = () => setInfoIsVisible(true);
  const hideInfo = () => setInfoIsVisible(false);

  const numColumns = 4;
  const numGutters = numColumns + 1;
  const gutterSize = 8;
  const windowWidth = Dimensions.get("window").width;
  const avatarSize = (windowWidth - gutterSize * numGutters) / numColumns;

  const showAchievementInfo = (item) => {
    setAchievement(item);
    showInfo();
  };

  const renderAchievement = ({ item }) => {
    return (
      <Achievement
        achievement={item}
        size={avatarSize}
        margin={gutterSize / 2}
        onPress={() => showAchievementInfo(item)}
      />
    );
  };

  return (
    <HeroBackgroundImage name="appreciation" fade={0.2}>
      <FlatList
        contentContainerStyle={{ margin: gutterSize / 2 }}
        numColumns={numColumns}
        data={achievements}
        renderItem={renderAchievement}
        keyExtractor={(item) => item.id}
      />
      <Portal>
        <AchievementInfo
          visible={infoIsVisible}
          onDismiss={hideInfo}
          achievement={achievement}
        />
      </Portal>
    </HeroBackgroundImage>
  );
}

export default AchievementList;
