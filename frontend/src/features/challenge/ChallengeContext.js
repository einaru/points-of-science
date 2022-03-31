/* eslint-disable no-unused-vars */
import { createContext } from "react";

const ChallengeContext = createContext({
  userData: {},
  setActivityData: (
    answer,
    dateStarted,
    hasUsedHints,
    hintResponse,
    hasUsedResources,
    resourcesResponse
  ) => {},
  setReflectionData: (answer, dateCompleted) => {},
});

export default ChallengeContext;
