import React from "react";
import Color from "color";
import { ProgressBar as PaperProgressBar } from "react-native-paper";

const RED = Color.rgb(192, 28, 40);
const YELLOW = Color.rgb(245, 194, 17);
const GREEN = Color.rgb(46, 194, 126);

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
    return interpolate(RED, YELLOW, progress * 2);
  }
  return interpolate(YELLOW, GREEN, progress - (1 - progress));
}

export default function ProgressBar({ progress }) {
  const color = getColor(progress).rgb().string();
  return <PaperProgressBar progress={progress} color={color} />;
}
