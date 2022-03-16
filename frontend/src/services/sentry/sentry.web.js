import * as SentryReact from "@sentry/react";
import Constants from "expo-constants";
import * as Sentry from "sentry-expo";

import isTesting from "./isTesting";

const { sentryDSN, enableSentry } = Constants.manifest.extra;

if (!isTesting && enableSentry) {
  Sentry.init({
    dsn: sentryDSN,
    enableInExpoDevelopment: true,
    debug: __DEV__,
  });
}

export const { ErrorBoundary } = SentryReact;

export default Sentry.Browser;
