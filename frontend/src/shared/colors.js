import Color from "color";

const colors = {
  red: Color.rgb(237, 51, 59),
  orange: Color.rgb(255, 120, 0),
  yellow: Color.rgb(246, 211, 45),
  green: Color.rgb(51, 209, 122),
  blue: Color.rgb(53, 132, 228),
  purple: Color.rgb(145, 65, 172),
  brown: Color.rgb(152, 106, 68),
};

export default colors;

export const colorStrings = Object.keys(colors).reduce(
  (obj, key) => ({
    ...obj,
    [key]: colors[key].string(),
  }),
  {}
);
