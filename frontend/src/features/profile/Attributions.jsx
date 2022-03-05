import { openURL } from "expo-linking";
import React from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { t } from "../../shared/i18n";

const attributions = {
  graphics: {
    label: t("Graphics"),
    items: [
      {
        label: `${t("Illustrations by")} Storyset`,
        url: "https://storyset.com",
      },
      {
        label: `${t("Emojis by")} Sensa`,
        url: "https://sensa.co/emoji/",
      },
    ],
  },
};

export default function Attributions() {
  return (
    <ScrollView>
      {Object.entries(attributions).map(([key, section]) => (
        <List.Section key={key}>
          <List.Subheader>{section.label}</List.Subheader>
          {section.items.map(({ label, url }) => (
            <List.Item
              key={url}
              title={label}
              description={url}
              right={() => <List.Icon icon="open-in-new" />}
              onPress={() => openURL(url)}
            />
          ))}
        </List.Section>
      ))}
    </ScrollView>
  );
}
