import Constants from "expo-constants";
import * as Sentry from "sentry-expo";

const { sentryDSN, enableSentry } = Constants.manifest.extra;

if (enableSentry) {
  Sentry.init({
    dsn: sentryDSN,
    enableInExpoDevelopment: true,
    debug: __DEV__,
  });
}

export const isEnabled = enableSentry;
export { default as ErrorScreen } from "./ErrorScreen";

export default Sentry;
