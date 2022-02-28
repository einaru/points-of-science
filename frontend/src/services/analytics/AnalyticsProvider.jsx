import { useMutation } from "@apollo/client";
import React, { useCallback, useContext, useMemo, useState } from "react";
import AuthContext from "../auth/AuthContext";
import AnalyticsContext from "./AnalyticsContext";
import { LOG_EVENT, LOG_DEVICE_INFO } from "./AnalyticsProvider.gql";
import deviceInfo from "./deviceInfo";
import extractMetadata from "./extractMetadata";

function getTimestamp() {
  return Date.now().valueOf().toString();
}

function debug(tag, data) {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.debug(`[${tag}]: ${JSON.stringify(data)}`);
  }
}

function AnalyticsProvider({ children }) {
  const [isDeviceInfoLogged, setIsDeviceInfoLogged] = useState(false);
  const { sessionToken } = useContext(AuthContext);

  const [logEvent] = useMutation(LOG_EVENT, {
    onError: (error) => {
      console.debug("Error logging click event:", error);
    },
  });

  const doLogEvent = useCallback(
    (event) => {
      logEvent({ variables: { sessionToken, event } });
      debug("click-event", event);
    },
    [logEvent, sessionToken]
  );

  const [logDeviceInfo] = useMutation(LOG_DEVICE_INFO, {
    onError: (error) => {
      console.debug("Error logging device info:", error);
    },
  });

  const doLogDeviceInfo = useCallback(() => {
    logDeviceInfo({ variables: { sessionToken, deviceInfo } });
    debug("device-info", deviceInfo);
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
            prevScreen: prevScreen?.name ?? null,
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
