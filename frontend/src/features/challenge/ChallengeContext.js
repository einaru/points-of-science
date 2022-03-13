/* eslint-disable no-unused-vars */
import { createContext } from "react";

const ChallengeContext = createContext({
  challenge: {},
  userData: {},
  setActivityData: (answer, dateStarted, hasUsedHints, hasUsedResources) => {},
  setReflectionData: (answer, dateCompleted) => {},
});

export default ChallengeContext;
