# MSc project frontend

This is the frontend for the application we developed as part of our master's
thesis in the spring of 2022.

## Prerequisites

The application is developed with [React Native][] and [Expo][]. Follow the
[Expo installation][] instructions to set up your development environment.

[React Native]: https://reactnative.dev/
[Expo]: https://expo.dev/
[Expo installation]: https://docs.expo.dev/get-started/installation/

Install dependencies by running `yarn`.

You also need to set the `HTTP_ENDPOINT` and `SUBSCRIPTION_ENDPOINT` environment
variables. These should point to the GraphQL URL's where the backend handles
HTTP and WebSocket requests respectively. You can put these variables
in a `.env` file or export them on the command line:

```bash
export HTTP_ENDPOINT="http://HOSTNAME:PORT/graphql"
export SUBSCRIPTION_ENDPOINT="ws://HOSTNAME:PORT/graphql"
```

## Sentry integration

To enable [Sentry](https://sentry.io) integration you must set the
`ENABLE_SENTRY` environment variable, e.g.:

```bash
export ENABLE_SENTRY=true
```

Additionally the following environment variables must be provided. Either put
them in a `.env` file or export them on the command line:

```bash
export SENTRY_ORGANIZATION="Sentry organization slug"
export SENTRY_PROJECT="Sentry project name"
export SENTRY_AUTH_TOKEN="Generated client auth token"
export SENTRY_DSN="Project client key DSN URL"
```

See Expo's documentation on [using Sentry][] for how to obtain these variables.

[using Sentry]: https://docs.expo.dev/guides/using-sentry/

## Running the application

Now you can run `yarn start` to fire up the application.
