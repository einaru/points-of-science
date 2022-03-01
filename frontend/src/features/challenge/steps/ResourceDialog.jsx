import React from "react";
import * as Linking from "expo-linking";
import { Dialog, IconButton, List } from "react-native-paper";
import { t } from "../../i18n";
import DialogAction from "./DialogAction";

export default function ResourceDialog({ resources, visible, onDismiss }) {
  // FIXME Remove/adjust once the resource structure is updated in backend
  const getResourceTitle = (resource) => {
    const title = resource.replace(/^https?:\/\//, "");
    return title.split("/")[0];
  };

  const openResource = (url) => {
    Linking.openURL(url);
    console.debug(`Opening resource ${url}`);
  };

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss(DialogAction.DISMISS)}>
      <Dialog.Title>{t("External resources")}</Dialog.Title>
      <Dialog.Content>
        {resources.map((resource) => {
          return (
            <List.Item
              key={resource}
              style={{ padding: 0 }}
              title={getResourceTitle(resource)}
              description={resource}
              descriptionNumberOfLines={1}
              right={() => <List.Icon icon="open-in-new" />}
              onPress={() => openResource(resource)}
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
