import { createContext } from "react";

const AnalyticsContext = createContext({
  logEvent: () => {},
});

export default AnalyticsContext;
