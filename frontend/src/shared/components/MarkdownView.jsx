import React from "react";
import Markdown from "react-native-markdown-display";
import { withTheme } from "react-native-paper";

import themedStyles from "./MarkdownView.style";

function MarkdownView({ theme, children }) {
  const styles = themedStyles(theme);
  return <Markdown style={styles}>{children}</Markdown>;
}

export default withTheme(MarkdownView);
