import React from "react";
import { Dialog, IconButton, Paragraph } from "react-native-paper";

import { t } from "../../../shared/i18n";
import DialogAction from "./DialogAction";

export default function HintDialog({ hint, visible, onDismiss }) {
  return (
    <Dialog visible={visible} onDismiss={() => onDismiss(DialogAction.DISMISS)}>
      <Dialog.Title>{t("Here's a little hint")}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{hint}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <IconButton
          icon="thumb-down"
          onPress={() => onDismiss(DialogAction.THUMB_DOWN)}
        />
        <IconButton
          icon="thumb-up"
          onPress={() => onDismiss(DialogAction.THUMB_UP)}
        />
      </Dialog.Actions>
    </Dialog>
  );
}
