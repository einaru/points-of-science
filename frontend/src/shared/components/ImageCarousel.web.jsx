import React from "react";
import { ImageBackground } from "react-native";

// This is quick and dirty workaround for the lack of browser support for the
// PagerView component from react-native-pager-view. From an array of images,
// simply display just one of them. This is okay since we don't really target
// the browser anyway.
//
// See: https://github.com/callstack/react-native-pager-view/issues/91
// See: https://github.com/callstack/react-native-pager-view/issues/333

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
    <ImageBackground
      style={{ height, width }}
      source={{ uri: images[initialImage] }}
    >
      {children}
    </ImageBackground>
  );
}

export default ImageCarousel;
