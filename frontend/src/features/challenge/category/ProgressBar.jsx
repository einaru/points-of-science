import Color from "color";
import React from "react";
import { ProgressBar as PaperProgressBar } from "react-native-paper";

import colors from "~shared/colors";

const { red, yellow, green } = colors;

function interpolate(start, end, frac) {
  switch (frac) {
    case 0:
      return start;
    case 1:
      return end;
    default:
      return Color.rgb(
        start.red() + (end.red() - start.red()) * frac,
        start.green() + (end.green() - start.green()) * frac,
        start.blue() + (end.blue() - start.blue()) * frac
      );
  }
}

function getColor(progress) {
  if (progress < 0.5) {
    return interpolate(red, yellow, progress * 2);
  }
  return interpolate(yellow, green, progress - (1 - progress));
}

export default function ProgressBar({ progress }) {
  const color = getColor(progress).rgb().string();
  return <PaperProgressBar progress={progress} color={color} />;
}
