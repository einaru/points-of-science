import { useMutation } from "@apollo/client";
import React, { useMemo } from "react";
import AnalyticsContext from "./AnalyticsContext";
import LOG_CLICK_STREAM from "./AnalyticsProvider.gql";

function getTimestamp() {
  return Date.now().valueOf().toString();
}

function AnalyticsProvider({ children }) {
  const [logEvent] = useMutation(LOG_CLICK_STREAM, {
    onError: (error) => {
      console.error("Error logging click event:", error);
    },
  });

  const analytics = useMemo(
    () => ({
      logNavigationEvent: (sessionToken, prevScreen, currentScreen) => {
        const event = {
          event: "navigation",
          screen: currentScreen.name,
          timestamp: getTimestamp(),
          metadata: {
            prevScreen: prevScreen.name,
          },
        };
        logEvent({ variables: { sessionToken, clicks: [event] } });
        console.debug("Logging event:", event);
      },
    }),
    [logEvent]
  );

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
