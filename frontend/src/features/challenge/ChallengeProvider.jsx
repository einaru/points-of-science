import React, { useMemo, useReducer } from "react";

import ChallengeContext from "./ChallengeContext";
import { initialState, reducer } from "./ChallengeProvider.reducer";

export default function ChallengeProvider({ challenge, children }) {
  const [userData, dispatch] = useReducer(reducer, initialState);

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

  const value = useMemo(
    () => ({
      challenge,
      userData,
      setActivityData,
      setReflectionData,
    }),
    [challenge, userData]
  );
  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}
