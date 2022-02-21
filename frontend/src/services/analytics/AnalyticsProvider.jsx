import { useMutation } from "@apollo/client";
import React, { useCallback, useContext, useMemo, useState } from "react";
import AuthContext from "../../features/auth/AuthContext";
import AnalyticsContext from "./AnalyticsContext";
import { LOG_EVENT, LOG_DEVICE_INFO } from "./AnalyticsProvider.gql";
import deviceInfo from "./deviceInfo";

function extractMetadata({ params }) {
  const metadata = {};
  if (params) {
    Object.keys(params).forEach((key) => {
      switch (key) {
        case "category":
          metadata.categoryID = params[key].id;
          break;
        case "challenge":
          metadata.challengeID = params[key].id;
          metadata.categoryID = params[key].category.id;
          break;
        // no default
      }
    });
  }
  return metadata;
}

function getTimestamp() {
  return Date.now().valueOf().toString();
}

function AnalyticsProvider({ children }) {
  const [isDeviceInfoLogged, setIsDeviceInfoLogged] = useState(false);
  const { sessionToken } = useContext(AuthContext);

  const [logEvent] = useMutation(LOG_EVENT, {
    onError: (error) => {
      console.error("Error logging click event:", error);
    },
  });

  const doLogEvent = useCallback(
    (event) => {
      logEvent({ variables: { sessionToken, event } });
      console.debug("Logging event:", event);
    },
    [logEvent, sessionToken]
  );

  const [logDeviceInfo] = useMutation(LOG_DEVICE_INFO, {
    onError: (error) => {
      console.error("Error logging device info:", error);
    },
  });

  const doLogDeviceInfo = useCallback(() => {
    logDeviceInfo({ variables: { sessionToken, deviceInfo } });
    console.debug("Logging device info:", deviceInfo);
    setIsDeviceInfoLogged(true);
  }, [logDeviceInfo, sessionToken]);

  const analytics = useMemo(
    () => ({
      logClickEvent: (screen, source) => {
        const metadata = extractMetadata(screen);
        const event = {
          event: "click",
          screen: screen.name,
          timestamp: getTimestamp(),
          metadata: {
            ...metadata,
            source,
          },
        };
        doLogEvent(event);
      },
      logNavigationEvent: (prevScreen, currentScreen) => {
        const metadata = extractMetadata(currentScreen);
        const event = {
          event: "navigation",
          screen: currentScreen.name,
          timestamp: getTimestamp(),
          metadata: {
            ...metadata,
            prevScreen: prevScreen.name,
          },
        };
        doLogEvent(event);
      },
    }),
    [doLogEvent]
  );

  if (sessionToken && !isDeviceInfoLogged) {
    doLogDeviceInfo();
  }

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
