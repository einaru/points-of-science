import { openURL } from "expo-linking";
import React from "react";
import { ScrollView, View } from "react-native";
import { List, Paragraph, Subheading } from "react-native-paper";

import { HeroImage } from "~shared/components";
import { t } from "~shared/i18n";

import styles from "./ProjectInfo.style";

function ProjectInfo() {
  // TODO persist this somewhere else
  const contacts = [
    {
      name: "Andreas N. Digernes",
      role: "Master student",
      phone: "+4712345678",
      email: "andrend@stud.ntnu.no",
    },
    {
      name: "Einar Uvsløkk",
      role: "Master student",
      phone: "+4712345678",
      email: "einaru@stud.ntnu.no",
    },
  ];

  return (
    <ScrollView>
      <HeroImage name="questions" />
      <View style={styles.content}>
        <Subheading style={styles.heading}>{t("Purpose")}</Subheading>
        <Paragraph>{t("aboutPurpose")}</Paragraph>
        <Subheading style={styles.heading}>{t("Contact info")}</Subheading>
        <Paragraph>{t("aboutContact")}</Paragraph>
      </View>
      {contacts.map((contact) => {
        return (
          <List.Accordion
            key={contact.email}
            title={contact.name}
            description={contact.role}
          >
            <List.Item
              left={() => <List.Icon icon="phone" />}
              right={() => <List.Icon icon="open-in-new" />}
              title={contact.phone}
              onPress={() => openURL(`tel:${contact.phone}`)}
            />
            <List.Item
              left={() => <List.Icon icon="email" />}
              right={() => <List.Icon icon="open-in-new" />}
              title={contact.email}
              onPress={() => openURL(`mailto:${contact.email}`)}
            />
          </List.Accordion>
        );
      })}
    </ScrollView>
  );
}

export default ProjectInfo;
