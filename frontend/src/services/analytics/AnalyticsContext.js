import { createContext } from "react";

const AnalyticsContext = createContext({
  logClickEvent: () => {},
  logNavigationEvent: () => {},
});

export default AnalyticsContext;
