import { useMutation } from "@apollo/client";
import React, { useMemo } from "react";
import AnalyticsContext from "./AnalyticsContext";
import LOG_CLICK_STREAM from "./AnalyticsProvider.gql";

function AnalyticsProvider({ children }) {
  const [logClickEvent, { data }] = useMutation(LOG_CLICK_STREAM, {
    onError: (error) => {
      console.error("Error logging click event:", error);
    },
  });
  const analytics = useMemo(
    () => ({
      logEvent: (sessionToken, event) => {
        const payload = {
          sessionToken,
          clicks: [event],
        };
        logClickEvent({ variables: payload });
        console.debug("Logging click event:", payload);
      },
    }),
    [logClickEvent]
  );

  if (data) {
    console.debug("Got click event response:", data);
  }

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
