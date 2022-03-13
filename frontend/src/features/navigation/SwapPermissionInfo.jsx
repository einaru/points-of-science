import React from "react";
import { View } from "react-native";
import {
  Modal,
  Paragraph,
  ProgressBar,
  Title,
  withTheme,
} from "react-native-paper";

import { Emoji } from "~shared/components";
import { t } from "~shared/i18n";

import themedStyles from "./SwapPermissionInfo.style";

function SwapPermissionInfo({ visible, onDismiss, theme }) {
  const [running, setRunning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const interval = React.useRef();
  const delay = 100; // Timer delay in ms
  const timeout = 10000; // Timeout in ms

  const styles = themedStyles(theme);

  const handleDismiss = React.useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  React.useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setProgress((prev) => prev + delay / timeout);
      }, delay);
    }
    return () => clearInterval(interval.current);
  }, [running]);

  React.useEffect(() => {
    if (progress >= 1) {
      setRunning(false);
      handleDismiss();
    }
  }, [progress, handleDismiss]);

  React.useEffect(() => {
    if (visible) {
      setRunning(true);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onDismiss={handleDismiss}
      contentContainerStyle={styles.contentContainer}
    >
      <Title style={styles.title}>{t("swapPermissionTitle")}</Title>
      <ProgressBar style={styles.progress} progress={progress} />
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
