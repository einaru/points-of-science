import React from "react";
import { ImageBackground } from "react-native";
import PagerView from "react-native-pager-view";

function ImageCarousel({
  images,
  width = "100%",
  height = 200,
  initialImage = 0,
  children,
}) {
  if (!images?.length) {
    return null;
  }
  return (
    <PagerView style={{ flex: 1 }} initialPage={initialImage}>
      {images.map((image, index) => (
        <ImageBackground
          key={index.toString()}
          style={{ height, width }}
          source={{ uri: image }}
        />
      ))}
      {children}
    </PagerView>
  );
}

export default ImageCarousel;
