import React from "react";
import { Modal, Paragraph, Title, withTheme } from "react-native-paper";
import { t } from "~shared/i18n";
import themedStyles from "./SwapPermissionInfo.style";

function SwapPermissionModal({ visible, onDismiss, theme }) {
  const styles = themedStyles(theme);

  const handleDismiss = () => {
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={handleDismiss}
      contentContainerStyle={styles.contentContainer}
    >
      <Title>{t("swapPermissionTitle")}</Title>
      <Paragraph>{t("swapPermissionParagraph1")}</Paragraph>
      <Paragraph>{t("swapPermissionParagraph2")}</Paragraph>
      <Paragraph style={styles.bold}>
        {t("Thank you so much for participating!")}
      </Paragraph>
    </Modal>
  );
}

export default withTheme(SwapPermissionModal);
