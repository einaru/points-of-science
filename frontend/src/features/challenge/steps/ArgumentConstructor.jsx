import React from "react";
import { View } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import { Button, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { t } from "../../../shared/i18n";
import themedStyles from "./ArgumentConstructor.style";

function getColor(i, n, alpha = 1) {
  const multiplier = 255 / (n - 1);
  const value = i * multiplier;
  return `rgba(${value}, ${Math.abs(128 - value)}, ${255 - value}, ${alpha})`;
}

function DraggableItem({ styles, item }) {
  return (
    <DraxView
      style={[styles.item, { backgroundColor: item.backgroundColor }]}
      draggingStyle={styles.dragging}
      dragReleasedStyle={styles.dragging}
      hoverDraggingStyle={styles.hoverDragging}
      dragPayload={item}
    >
      <Text>{item.label}</Text>
    </DraxView>
  );
}

export default function ArgumentConstructor({
  question,
  choices,
  onChangeArgument,
}) {
  const theme = useTheme();
  const styles = themedStyles(theme);
  const initialData = new Set();
  const initialChoices = new Set(
    choices.map((label, index) => ({
      label,
      key: label,
      backgroundColor: getColor(index, choices.length, 0.7),
    }))
  );

  const [argumentData, setArgumentData] = React.useState(initialData);
  const [argumentChoices, setArgumentChoices] = React.useState(initialChoices);

  const reset = () => {
    setArgumentData(initialData);
    setArgumentChoices(initialChoices);
  };
  const undo = () => {
    const data = Array.from(argumentData);
    const item = data.pop();
    setArgumentData(new Set(data));
    if (item) {
      setArgumentChoices((oldState) => new Set(oldState).add(item));
    }
  };

  return (
    <DraxProvider>
      <View style={styles.content}>
        <Text style={styles.question}>{question}</Text>
        <DraxView
          id="source"
          style={styles.bin}
          payload={argumentChoices}
          receivingStyle={styles.receiving}
          draggable={false}
          renderContent={() => {
            const items = Array.from(argumentChoices);
            return items.length === 0 ? (
              <View style={[styles.placeholder, styles.centered]}>
                <Text>{t("No more items to choose from!")}</Text>
              </View>
            ) : (
              items.map((item) => (
                <DraggableItem key={item.key} item={item} styles={styles} />
              ))
            );
          }}
          onReceiveDragDrop={(event) => {
            const item = event.dragged.payload;
            setArgumentChoices((state) => new Set(state).add(item));
            const otherState = argumentData;
            otherState.delete(item);
            setArgumentData(otherState);
          }}
        />
        <View style={styles.divider}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="arrow-up-down"
            size={24}
          />
        </View>
        <DraxView
          id="destination"
          style={styles.bin}
          payload={argumentData}
          receivingStyle={styles.receiving}
          draggable={false}
          renderContent={() => {
            const items = Array.from(argumentData);
            return items.length === 0 ? (
              <View style={[styles.placeholder, { padding: 32 }]}>
                <Text style={styles.title}>
                  {t("howToFormAnArgumentTitle")}
                </Text>
                <Text style={styles.text}>{t("howToFormAnArgumentText")}</Text>
              </View>
            ) : (
              items.map((item) => (
                <DraggableItem key={item.key} item={item} styles={styles} />
              ))
            );
          }}
          onReceiveDragDrop={(event) => {
            const item = event.dragged.payload;
            setArgumentData((oldState) => {
              const state = new Set(oldState).add(item);
              const answer = Array.from(state).map((arg) => arg.label);
              onChangeArgument(JSON.stringify(answer));
              return state;
            });
            const otherState = argumentChoices;
            otherState.delete(item);
            setArgumentChoices(otherState);
          }}
        />
        <View style={styles.actions}>
          <Button mode="outlined" icon="delete" onPress={() => reset()}>
            {t("Reset")}
          </Button>
          <Button mode="outlined" icon="undo" onPress={() => undo()}>
            {t("Undo")}
          </Button>
        </View>
      </View>
    </DraxProvider>
  );
}
