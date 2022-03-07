import React from "react";
import { FlatList, View } from "react-native";
import { Divider, Text, withTheme } from "react-native-paper";

import ContentContext from "~services/content/ContentContext";
import { HeroBackgroundImage } from "~shared/components";

import themedStyles from "./Leaderboard.style";

function Leaderboard({ theme }) {
  const { leaderboards } = React.useContext(ContentContext);
  const styles = themedStyles(theme);

  const renderItem = ({ item, index }) => {
    const rank = index + 1;
    return (
      <View style={styles.row}>
        <Text style={styles.rank}>{rank}</Text>
        <Text style={styles.name}>{item.username}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  const renderSeparator = () => {
    return <Divider />;
  };

  return (
    <HeroBackgroundImage name="winners" fade={0.2}>
      <FlatList
        contentContainerStyle={{ margin: 8 }}
        initialNumToRender={10}
        data={leaderboards.highscore}
        keyExtractor={(item) => item.username}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </HeroBackgroundImage>
  );
}

export default withTheme(Leaderboard);
