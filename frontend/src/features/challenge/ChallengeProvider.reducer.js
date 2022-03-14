export const initialState = {
  dateStarted: null,
  dateCompleted: null,
  activityAnswer: null,
  reflectionAnswer: null,
  hasUsedHints: false,
  hasUsedResources: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "activityCompleted":
      return {
        ...state,
        dateStarted: action.dateStarted,
        activityAnswer: action.answer,
        hasUsedHints: action.hasUsedHints,
        hintResponse: action.hintResponse,
        hasUsedResources: action.hasUsedResources,
        resourcesResponse: action.resourcesResponse,
      };
    case "reflectionCompleted":
      return {
        ...state,
        dateCompleted: action.dateCompleted,
        reflectionAnswer: action.answer,
      };
    default:
      return new Error();
  }
};
