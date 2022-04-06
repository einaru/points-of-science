import React from "react";
import { View } from "react-native";
import { Modal, Paragraph, Text, Title, withTheme } from "react-native-paper";

import { ProgressBar } from "~shared/components";
import { t } from "~shared/i18n";

import themedStyle from "./AchievementInfo.style";

function AchievementInfo({ info, visible, onDismiss, theme }) {
  if (!info?.achievement) {
    return null;
  }

  const styles = themedStyle(theme);
  const { achievement, progress } = info;
  const percent = (progress * 100).toFixed();

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        <Title>{achievement.name}</Title>
        <Paragraph>{achievement.description}</Paragraph>
      </View>
      <ProgressBar progress={progress} />
      <View style={styles.content}>
        <View style={styles.progressInfo}>
          <Text>{t("Progress")}</Text>
          <Text>{`(${percent}%)`}</Text>
        </View>
      </View>
    </Modal>
  );
}

export default withTheme(AchievementInfo);
