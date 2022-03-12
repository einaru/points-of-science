import React from "react";
import { View } from "react-native";
import { Modal, Paragraph, Title, withTheme } from "react-native-paper";
import Emoji from "~shared/components/Emoji";
import { t } from "~shared/i18n";
import themedStyles from "./SwapPermissionInfo.style";

function SwapPermissionInfo({ visible, onDismiss, theme }) {
  const styles = themedStyles(theme);

  const handleDismiss = () => {
    onDismiss();
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleDismiss();
    }, 10000);
    return () => clearTimeout();
  });

  return (
    <Modal
      visible={visible}
      onDismiss={handleDismiss}
      contentContainerStyle={styles.contentContainer}
    >
      <Title style={styles.title}>{t("swapPermissionTitle")}</Title>
      <Paragraph>{t("swapPermissionParagraph1")}</Paragraph>
      <Paragraph>{t("swapPermissionParagraph2")}</Paragraph>
      <View style={styles.emojiContainer}>
        <Emoji name="rocket" />
        <Emoji name="partyingFace" />
        <Emoji name="unicorn" />
      </View>
      <Paragraph style={styles.thanks}>{t("swapPermissionThanks")}</Paragraph>
    </Modal>
  );
}

export default withTheme(SwapPermissionInfo);
