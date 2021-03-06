import { useMutation } from "@apollo/client";
import React from "react";

import AuthContext from "~services/auth/AuthContext";
import Sentry from "~services/sentry";
import { getTimestamp } from "~shared/timestamp";

import AnalyticsContext from "./AnalyticsContext";
import { LOG_DEVICE_INFO, LOG_EVENT } from "./AnalyticsProvider.gql";
import deviceInfo from "./deviceInfo";
import extractMetadata from "./extractMetadata";

function AnalyticsProvider({ children }) {
  const [isDeviceInfoLogged, setIsDeviceInfoLogged] = React.useState(false);
  const { sessionToken } = React.useContext(AuthContext);

  const [logEvent] = useMutation(LOG_EVENT, {
    onError: (error) => {
      Sentry.captureException(error);
    },
  });

  const doLogEvent = React.useCallback(
    (event) => {
      logEvent({ variables: { sessionToken, event } });
    },
    [logEvent, sessionToken]
  );

  const [logDeviceInfo] = useMutation(LOG_DEVICE_INFO, {
    onError: (error) => {
      Sentry.captureException(error);
    },
  });

  const doLogDeviceInfo = React.useCallback(() => {
    logDeviceInfo({ variables: { sessionToken, deviceInfo } });
    setIsDeviceInfoLogged(true);
  }, [logDeviceInfo, sessionToken]);

  const analytics = React.useMemo(
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
