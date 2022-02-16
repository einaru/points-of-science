import React, { useContext } from "react";
import { Image, View } from "react-native";
import { Title, TouchableRipple } from "react-native-paper";
import styles from "./CategoryList.style";
import { NoContent, Surface } from "../../../shared/components";
import ContentContext from "../../content/ContentContext";
import { t } from "../../i18n";

const fallbackImage = require("../assets/category.png");

function CategoryListItem({ category, onPress }) {
  const imageSource = category.image ? { uri: category.image } : fallbackImage;

  return (
    <Surface style={styles.surface}>
      <TouchableRipple onPress={onPress}>
        <View style={styles.listItemContainer}>
          <Image style={styles.image} source={imageSource} />
          <View style={styles.listItemContent}>
            <Title>{category.name}</Title>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
}

function CategoryList({ navigation }) {
  const { categories } = useContext(ContentContext);

  if (!categories.length) {
    return <NoContent message={t("Couldn't find any content")} />;
  }

  return (
    <View style={styles.listContainer}>
      {categories.map((category) => {
        return (
          <CategoryListItem
            key={category.id}
            category={category}
            onPress={() => {
              navigation.navigate("category:challenge-list", {
                category,
              });
            }}
          />
        );
      })}
    </View>
  );
}

export default CategoryList;