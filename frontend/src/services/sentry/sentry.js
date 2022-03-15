import Constants from "expo-constants";
import * as Sentry from "sentry-expo";

import isTesting from "./isTesting";

const { sentryDSN, enableSentry, httpEndpoint } = Constants.manifest.extra;

if (!isTesting && enableSentry) {
  Sentry.init({
    dsn: sentryDSN,
    enableInExpoDevelopment: true,
    debug: __DEV__,
    integrations: [
      new Sentry.Native.ReactNativeTracing({
        tracingOrigins: [
          "localhost",
          httpEndpoint.replace(/^https?:\/\//, ""),
          /^\//,
        ],
      }),
    ],
  });
}

export const { ErrorBoundary } = Sentry.Native;

export default Sentry.Native;
