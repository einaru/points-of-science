import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { HeroBackgroundImage } from "~shared/components";

function AchievementsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeroBackgroundImage name="appreciation" />
    </SafeAreaView>
  );
}

export default AchievementsScreen;
