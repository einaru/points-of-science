import React from "react";

import ChallengeContext from "./ChallengeContext";
import { initialState, reducer } from "./ChallengeProvider.reducer";

export default function ChallengeProvider({ children }) {
  const [userData, dispatch] = React.useReducer(reducer, initialState);

  const setActivityData = (
    answer,
    dateStarted,
    hasUsedHints,
    hintResponse,
    hasUsedResources,
    resourcesResponse
  ) => {
    dispatch({
      type: "activityCompleted",
      dateStarted,
      answer,
      hasUsedHints,
      hintResponse,
      hasUsedResources,
      resourcesResponse,
    });
  };

  const setReflectionData = (answer, dateCompleted) => {
    dispatch({
      type: "reflectionCompleted",
      dateCompleted,
      answer,
    });
  };

  const value = React.useMemo(
    () => ({
      userData,
      setActivityData,
      setReflectionData,
    }),
    [userData]
  );
  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}
