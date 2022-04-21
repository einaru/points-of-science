import React from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { Portal } from "react-native-paper";

import ContentContext from "~services/content/ContentContext";
import HeroBackgroundImage from "~shared/components/HeroBackgroundImage";

import Achievement from "./Achievement";
import AchievementInfo from "./AchievementInfo";

function AchievementList() {
  const { achievements, user } = React.useContext(ContentContext);
  const { width: windowWidth } = useWindowDimensions();

  const userAchievements = React.useMemo(
    () => (user.achievements ? user.achievements?.map(({ id }) => id) : []),
    [user.achievements]
  );

  const userProgress = React.useMemo(
    () =>
      user.progress
        ? user.progress.achievements.reduce(
            (obj, { id, progress }) => ({
              ...obj,
              [id]: progress,
            }),
            {}
          )
        : {},
    [user.progress]
  );

  const [info, setInfo] = React.useState();
  const [infoIsVisible, setInfoIsVisible] = React.useState(false);

  const showInfo = () => setInfoIsVisible(true);
  const hideInfo = () => setInfoIsVisible(false);

  const numColumns = 4;
  const numGutters = numColumns + 1;
  const gutterSize = 8;
  const avatarSize = (windowWidth - gutterSize * numGutters) / numColumns;

  const showAchievementInfo = (item) => {
    const progress = userProgress[item.id] || 0;
    setInfo({ achievement: item, progress });
    showInfo();
  };

  const renderAchievement = ({ item }) => {
    return (
      <Achievement
        achievement={item}
        size={avatarSize}
        margin={gutterSize / 2}
        onPress={() => showAchievementInfo(item)}
        locked={!userAchievements.includes(item.id)}
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
          info={info}
          visible={infoIsVisible}
          onDismiss={hideInfo}
        />
      </Portal>
    </HeroBackgroundImage>
  );
}

export default AchievementList;
