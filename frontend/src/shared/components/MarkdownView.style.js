import Color from "color";
import { Platform, StyleSheet } from "react-native";

// This is an attempt to match the styling of the Markdown component from
// react-native-markdown-display with the styles used in react-native-paper.
// Currently only a subset of the elements are covered, such as tables and
// code blocks.
//
// See: https://github.com/iamacup/react-native-markdown-display#How-to-style-stuff

const heading = Platform.select({
  io: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
  android: {
    fontFamily: "sans-serif-medium",
    fontSize: 16,
    fontWeight: "normal",
    marginVertical: 8,
  },
  default: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 8,
  },
});

const headings = [...Array(6).keys()].reduce(
  (obj, i) => ({
    ...obj,
    [`heading${i}`]: heading,
  }),
  {}
);

export default function themedStyles(theme) {
  const { colors } = theme;

  const borderColor = Color(colors.text).alpha(0.12).rgb().string();
  const backgroundColor = theme.dark
    ? Color(colors.background).lighten(0.24).string()
    : Color(colors.background).darken(0.06).string();

  const codeBlock = {
    backgroundColor,
    borderRadius: theme.roundness,
    borderWidth: 0,
    elevation: 2,
    fontSize: 12,
    marginVertical: 4,
    padding: 8,
  };

  return StyleSheet.create({
    ...headings,
    body: {
      color: colors.text,
    },
    paragraph: {
      fontSize: 14,
      marginBottom: 8,
    },
    table: {
      borderColor,
      borderRadius: 0,
      borderWidth: 0,
      fontSize: 12,
      marginHorizontal: -8,
      marginVertical: 4,
    },
    tr: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor,
      paddingHorizontal: 4,
    },
    thead: {
      borderBottomWidth: StyleSheet.hairlineWidth * 2,
      borderColor,
    },
    th: {
      color: colors.placeholder,
      fontWeight: "500",
    },
    code_block: {
      ...codeBlock,
    },
    fence: {
      ...codeBlock,
    },
  });
}
