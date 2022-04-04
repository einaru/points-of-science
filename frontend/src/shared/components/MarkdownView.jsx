import React from "react";
import Markdown, { MarkdownIt } from "react-native-markdown-display";
import { Paragraph, withTheme } from "react-native-paper";

import themedStyles from "./MarkdownView.style";

const rules = {
  paragraph: (node, children, _parent, styles) => (
    <Paragraph key={node.key} style={styles.paragraph}>
      {children}
    </Paragraph>
  ),
};

const markdownIt = MarkdownIt({ typographer: true, linkify: true });

function MarkdownView({ theme, children }) {
  const styles = themedStyles(theme);
  return (
    <Markdown style={styles} rules={rules} markdownit={markdownIt}>
      {children}
    </Markdown>
  );
}

export default withTheme(MarkdownView);
