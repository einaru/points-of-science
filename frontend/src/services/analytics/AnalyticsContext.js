import { createContext } from "react";

const AnalyticsContext = createContext({
  logNavigationEvent: () => {},
});

export default AnalyticsContext;
