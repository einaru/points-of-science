const Difficulty = Object.freeze({
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  EXPERT: "expert",
});

export default Difficulty;

function asInt(difficulty) {
  switch (difficulty) {
    case Difficulty.BEGINNER:
      return 1;
    case Difficulty.INTERMEDIATE:
      return 2;
    case Difficulty.EXPERT:
      return 3;
    default:
      throw new Error(`Invalid difficulty value: ${difficulty}`);
  }
}

/**
 * Compare two difficulties.
 *
 * The function is compatible with the Array.sort compareFn parameter,
 * and can be used to sort, e.g., challenges by difficulty.
 *
 * @param {*} a The first difficulty to compare
 * @param {*} b The second difficulty to compare
 * @returns <0 if a is easier than b, >0 if b is easier than a, else 0.
 */
export function compareDifficulties(a, b) {
  return asInt(a) - asInt(b);
}
