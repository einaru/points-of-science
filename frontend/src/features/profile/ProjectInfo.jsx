/* eslint-disable global-require */
import { openURL } from "expo-linking";
import React from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { List, Paragraph, Subheading } from "react-native-paper";
import { t } from "../i18n";

const styles = StyleSheet.create({
  content: {
    margin: 8,
  },
  heroImage: {
    width: 128,
    height: 128,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  heading: {
    fontWeight: "bold",
    marginTop: 8,
  },
});

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
      <Image style={styles.heroImage} source={require("./question.png")} />
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
