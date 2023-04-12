// Workaround to get testing with Jest to work with Sentry.
// When testing, Sentry is initialized with transport from sentry-testkit
// See: https://github.com/getsentry/sentry-react-native/issues/1611
// See: https://zivl.github.io/sentry-testkit/#/getting-started/?id=working-with-jest
const isTesting =
  process.env.JEST_WORKER_ID !== undefined ||
  process.env.NODE_ENV === "testing";

export default isTesting;
