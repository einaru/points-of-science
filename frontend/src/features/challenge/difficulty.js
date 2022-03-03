import colors from "../../shared/colors";

export const Difficulty = Object.freeze({
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  EXPERT: "expert",
});

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
