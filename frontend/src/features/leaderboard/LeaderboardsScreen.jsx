import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeroBackgroundImage } from "../../shared/components";

function LeaderboardsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeroBackgroundImage name="winners" />
    </SafeAreaView>
  );
}

export default LeaderboardsScreen;
