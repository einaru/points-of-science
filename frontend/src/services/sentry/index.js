import Constants from "expo-constants";

import Sentry from "./sentry";

const { sentryDSN, enableSentry } = Constants.manifest.extra;

// Workaround to get testing with Jest to work.
// When testing Sentry is initialized with transport from sentry-testkit
// See: https://github.com/getsentry/sentry-react-native/issues/1611
// See: https://wix.github.io/sentry-testkit/#/getting-started/?id=working-with-jest
const isJestTest = process.env.JEST_WORKER_ID !== "undefined";

if (!isJestTest && enableSentry) {
  Sentry.init({
    dsn: sentryDSN,
    enableInExpoDevelopment: true,
    debug: __DEV__,
  });
}

export const isEnabled = enableSentry;
export { default as ErrorScreen } from "./ErrorScreen";
export { ErrorBoundary } from "./sentry";

export default Sentry;
