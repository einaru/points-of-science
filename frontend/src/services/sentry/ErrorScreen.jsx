import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { illustrations } from "~shared/assets";
import { t } from "~shared/i18n";

import styles from "./ErrorScreen.style";

export default function ErrorScreen({ resetError }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={illustrations.error} />
      <View style={styles.content}>
        <Text style={styles.title}>{t("Something went wrong!")}</Text>
        <Button mode="contained" onPress={resetError}>
          {t("Try again")}
        </Button>
      </View>
    </View>
  );
}
