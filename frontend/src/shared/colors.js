import Color from "color";

import Difficulty from "./difficulty";

const colors = {
  red: Color.rgb(237, 51, 59),
  orange: Color.rgb(255, 120, 0),
  yellow: Color.rgb(246, 211, 45),
  green: Color.rgb(51, 209, 122),
  blue: Color.rgb(53, 132, 228),
  purple: Color.rgb(145, 65, 172),
  brown: Color.rgb(152, 106, 68),
  gray: Color.rgb(94, 92, 100),
};

export default colors;

export const colorStrings = Object.keys(colors).reduce(
  (obj, key) => ({
    ...obj,
    [key]: colors[key].string(),
  }),
  {}
);

export function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return Color(`#${"00000".substring(0, 6 - color.length)}${color}`);
}

export function getColorsFromString(string, lighten = 0.5, darken = 0.5) {
  const bgColor = stringToColor(string);
  const fgColor = bgColor.isDark()
    ? bgColor.lighten(lighten)
    : bgColor.darken(darken);
  return { bgColor, fgColor };
}

export function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case Difficulty.BEGINNER:
      return colors.green;
    case Difficulty.INTERMEDIATE:
      return colors.yellow;
    case Difficulty.EXPERT:
      return colors.red;
    default:
      throw new Error(`Got invalid difficulty level "${difficulty}.`);
  }
}
