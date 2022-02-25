import React, { useState } from "react";
import { View } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import { Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { t } from "../../i18n";
import styles from "./ArgumentConstructor.style";

function getColor(i, n, alpha = 1) {
  const multiplier = 255 / (n - 1);
  const value = i * multiplier;
  return `rgba(${value}, ${Math.abs(128 - value)}, ${255 - value}, ${alpha})`;
}

function DraggableItem({ item }) {
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

export default function ArgumentConstructor({ question, choices }) {
  const initialData = new Set();
  const initialChoices = new Set(
    choices.map((label, index) => ({
      label,
      key: label,
      backgroundColor: getColor(index, choices.length, 0.7),
    }))
  );

  const [argumentData, setArgumentData] = useState(initialData);
  const [argumentChoices, setArgumentChoices] = useState(initialChoices);

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
            items.map((item) => <DraggableItem key={item.key} item={item} />)
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
        <MaterialCommunityIcons name="arrow-up-down" size={24} />
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
              <Text style={styles.title}>{t("Form your argument here")}</Text>
              <Text style={styles.text}>{t("howToFormAnArgumentText1")}</Text>
              <Text style={styles.text}>{t("howToFormAnArgumentText2")}</Text>
            </View>
          ) : (
            items.map((item) => <DraggableItem key={item.key} item={item} />)
          );
        }}
        onReceiveDragDrop={(event) => {
          const item = event.dragged.payload;
          setArgumentData((state) => new Set(state).add(item));
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
    </DraxProvider>
  );
}
