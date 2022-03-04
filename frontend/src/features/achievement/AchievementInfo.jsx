import React from "react";
import { Modal, Paragraph, Title, withTheme } from "react-native-paper";

import themedStyle from "./AchievementInfo.style";

function AchievementInfo({ achievement, visible, onDismiss, theme }) {
  const styles = themedStyle(theme);
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.infoContainer}
    >
      <Title>{achievement?.name}</Title>
      <Paragraph>{achievement?.description}</Paragraph>
    </Modal>
  );
}

export default withTheme(AchievementInfo);
