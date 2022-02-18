import { useMutation } from "@apollo/client";
import React, { useMemo } from "react";
import AnalyticsContext from "./AnalyticsContext";
import LOG_CLICK_STREAM from "./AnalyticsProvider.gql";

function getTimestamp() {
  return Date.now().valueOf().toString();
}

function AnalyticsProvider({ children }) {
  const [logClickEvent] = useMutation(LOG_CLICK_STREAM, {
    onError: (error) => {
      console.error("Error logging click event:", error);
    },
  });
  const analytics = useMemo(
    () => ({
      logEvent: (sessionToken, prevScreen, currentScreen) => {
        const payload = {
          sessionToken,
          clicks: [
            {
              event: "navigation",
              screen: currentScreen.name,
              timestamp: getTimestamp(),
              metadata: {
                prevScreen: prevScreen.name,
              },
            },
          ],
        };
        logClickEvent({ variables: payload });
        console.debug("Logging click event:", payload);
      },
    }),
    [logClickEvent]
  );

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
