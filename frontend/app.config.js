import dotenv from "dotenv";
import { expand } from "dotenv-expand";

expand(dotenv.config());

function asBool(value) {
  if (!value) {
    return false;
  }
  if (typeof value === "number") {
    return value === 1;
  }
  return ["true", "1", "yes", "y", "on"].includes(value.toLowerCase());
}

export default ({ config }) => {
  return {
    ...config,
    extra: {
      httpEndpoint: process.env.HTTP_ENDPOINT,
      wsEndpoint: process.env.SUBSCRIPTION_ENDPOINT,
      enableSentry: asBool(process.env.ENABLE_SENTRY),
      sentryDSN: process.env.SENTRY_DSN,
      projectWebsite: process.env.PROJECT_WEBSITE,
    },
    plugins: ["sentry-expo"],
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: process.env.SENTRY_ORGANIZATION,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  };
};
