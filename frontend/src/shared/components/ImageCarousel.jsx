import React from "react";
import { FlatList, ImageBackground, useWindowDimensions } from "react-native";

function ImageCarousel({ images, height: customHeight, children }) {
  const window = useWindowDimensions();

  const height = customHeight || window.height / 3;

  if (!images?.length) {
    return null;
  }

  const renderItem = ({ item: image }) => (
    <ImageBackground
      source={{ uri: image }}
      resizeMode="cover"
      style={{ height: "100%", width: window.width }}
    >
      {children}
    </ImageBackground>
  );

  return (
    <FlatList
      horizontal
      pagingEnabled
      snapToInterval={window.width}
      snapToAlignment="end"
      contentContainerStyle={{ height }}
      keyExtractor={(item) => item}
      data={images}
      renderItem={renderItem}
    />
  );
}

export default ImageCarousel;
