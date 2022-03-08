import React from "react";
import { ScrollView, View, Platform, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, TextInput, withTheme } from "react-native-paper";

import { HeroImage } from "~shared/components";
import { t } from "~shared/i18n";

import styles from "./OpenReflection.style";

function OpenReflection({ title, onChange, theme }) {
  const [text, setText] = React.useState("");

  const handleChange = (value) => {
    setText(value);
    onChange(value);
  };

  const renderContent = () => {
    const window = Dimensions.get("window");
    return (
      <View style={styles.content}>
        <HeroImage name="science" size={window.width - 16} />
        <Text style={styles.title}>{title}</Text>
        <TextInput
          multiline
          style={{ flex: 1 }}
          autoFocus={Platform.OS !== "ios"}
          label={t("Reflection")}
          value={text}
          onChangeText={handleChange}
        />
      </View>
    );
  };

  // Similar to the issue with the form elements in the account package,
  // we need to be handled iOS devices a bit different here as well.
  // By using KeyboardAwareScrollView and disabling autofocus (see above),
  // we have a solution that is not perfect, but works "okay".
  return Platform.OS === "ios" ? (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.scroll,
        { backgroundColor: theme.colors.background },
      ]}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
      {renderContent()}
    </KeyboardAwareScrollView>
  ) : (
    <ScrollView contentContainerStyle={styles.scroll}>
      {renderContent()}
    </ScrollView>
  );
}

export default withTheme(OpenReflection);
