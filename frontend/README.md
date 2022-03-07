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
in a `.env` file or export it on the command line:

```bash
export HTTP_ENDPOINT="http://HOSTNAME:PORT/graphql"
export SUBSCRIPTION_ENDPOINT="ws://HOSTNAME:PORT/graphql"
```

Now you can run `yarn start` to fire up the application.
