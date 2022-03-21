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
    <PagerView style={{ width, height }} initialPage={initialImage}>
      {images.map((image, index) => (
        <ImageBackground
          key={index.toString()}
          source={{ uri: image }}
          height={height}
          width={width}
        >
          {children}
        </ImageBackground>
      ))}
    </PagerView>
  );
}

export default ImageCarousel;
