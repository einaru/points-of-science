import { useMutation } from "@apollo/client";
import React, { useCallback, useMemo } from "react";
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

  const doLogEvent = useCallback(
    (sessionToken, event) => {
      logEvent({ variables: { sessionToken, event } });
      console.debug("Logging event:", event);
    },
    [logEvent]
  );

  const analytics = useMemo(
    () => ({
      logClickEvent: (sessionToken, screen, source) => {
        const event = {
          event: "click",
          screen: screen.name,
          timestamp: getTimestamp(),
          metadata: {
            source,
          },
        };
        doLogEvent(sessionToken, event);
      },
      logNavigationEvent: (sessionToken, prevScreen, currentScreen) => {
        const event = {
          event: "navigation",
          screen: currentScreen.name,
          timestamp: getTimestamp(),
          metadata: {
            prevScreen: prevScreen.name,
          },
        };
        doLogEvent(sessionToken, event);
      },
    }),
    [doLogEvent]
  );

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
