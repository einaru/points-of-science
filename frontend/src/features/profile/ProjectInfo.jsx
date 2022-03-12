import { openURL } from "expo-linking";
import React from "react";
import { ScrollView, View } from "react-native";
import { List, Paragraph, Subheading } from "react-native-paper";

import ContentContext from "~services/content/ContentContext";
import { HeroImage } from "~shared/components";
import { t } from "~shared/i18n";

import styles from "./ProjectInfo.style";

function ProjectInfo() {
  const { contacts } = React.useContext(ContentContext);

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
            {contact.phone && (
              <List.Item
                left={() => <List.Icon icon="phone" />}
                right={() => <List.Icon icon="open-in-new" />}
                title={contact.phone}
                onPress={() => openURL(`tel:${contact.phone}`)}
              />
            )}
            {contact.email && (
              <List.Item
                left={() => <List.Icon icon="email" />}
                right={() => <List.Icon icon="open-in-new" />}
                title={contact.email}
                onPress={() => openURL(`mailto:${contact.email}`)}
              />
            )}
          </List.Accordion>
        );
      })}
    </ScrollView>
  );
}

export default ProjectInfo;
