import * as Linking from "expo-linking";
import React from "react";
import { Dialog, IconButton, List } from "react-native-paper";

import { t } from "~shared/i18n";

import DialogAction from "./DialogAction";

export default function ResourceDialog({
  resources,
  visible,
  onDismiss,
  onResourceVisited,
}) {
  const openResource = (url) => {
    onResourceVisited(url);
    Linking.openURL(url);
  };

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss(DialogAction.DISMISS)}>
      <Dialog.Title>{t("External resources")}</Dialog.Title>
      <Dialog.Content>
        {resources.map(({ title, url }) => {
          return (
            <List.Item
              key={url}
              style={{ padding: 0 }}
              title={title}
              description={url}
              descriptionNumberOfLines={1}
              right={() => <List.Icon icon="open-in-new" />}
              onPress={() => openResource(url)}
            />
          );
        })}
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
