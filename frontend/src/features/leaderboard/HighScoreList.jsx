import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";

import ContentContext from "~services/content/ContentContext";
import colors from "~shared/colors";
import { HeroBackgroundImage } from "~shared/components";

function HighScoreList() {
  const { user, leaderboards } = React.useContext(ContentContext);

  const rankedHighScores = React.useMemo(
    () =>
      leaderboards.highScores.scores
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({
          ...item,
          rank: index + 1,
        })),
    [leaderboards.highScores]
  );

  return (
    <HeroBackgroundImage name="winners" fade={0.2}>
      <ScrollView style={{ flex: 1 }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Rank</DataTable.Title>
            <DataTable.Title>User</DataTable.Title>
            <DataTable.Title numeric>Score</DataTable.Title>
          </DataTable.Header>
          {rankedHighScores.map((entry) => {
            const style =
              entry.userID === user.id
                ? { backgroundColor: colors.yellow.fade(0.5).string() }
                : null;
            return (
              <DataTable.Row key={entry.userID} style={style}>
                <DataTable.Cell>{entry.rank}</DataTable.Cell>
                <DataTable.Cell>{entry.username}</DataTable.Cell>
                <DataTable.Cell numeric>{entry.score}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>
    </HeroBackgroundImage>
  );
}

export default HighScoreList;
