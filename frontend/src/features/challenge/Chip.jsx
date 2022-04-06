import React from "react";
import { Chip as PaperChip } from "react-native-paper";

import { getDifficultyColor } from "~shared/colors";
import { t } from "~shared/i18n";

export default function Chip({ style, textStyle, mode, children }) {
  const baseStyle = { elevation: 2 };
  return (
    <PaperChip style={[baseStyle, style]} textStyle={textStyle} mode={mode}>
      {children}
    </PaperChip>
  );
}

export function renderReward(challenge) {
  if (challenge.reward) {
    const { maxPoints } = challenge.reward;
    const label = maxPoints === 1 ? t("point") : t("points");
    return (
      <Chip>
        {maxPoints} {label}
      </Chip>
    );
  }
  return null;
}

export function renderDifficulty(challenge) {
  const color = getDifficultyColor(challenge.difficulty);
  const textStyle = {
    color: color.isLight()
      ? color.darken(0.6).string()
      : color.lighten(0.6).string(),
  };
  const style = {
    backgroundColor: color.string(),
  };
  return (
    <Chip style={style} textStyle={textStyle}>
      {t(challenge.difficulty)}
    </Chip>
  );
}
