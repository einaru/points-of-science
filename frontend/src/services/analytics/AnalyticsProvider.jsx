import React, { useMemo } from "react";
import AnalyticsContext from "./AnalyticsContext";

function AnalyticsProvider({ children }) {
  const analytics = useMemo(
    () => ({
      logEvent: (data) => {
        console.log("AnalyticsProvider.logEvent:", data);
      },
    }),
    []
  );
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
