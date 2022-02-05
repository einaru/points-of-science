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

You also need to set the `API_ENDPOINT` environment variable, and point it
towards the GraphQL endpoint served by the backend. You can put this variable
in a `.env` file or export it on the command line:

```bash
export API_ENDPOINT="http://192.168.1.43:5000/graphql"
```

Now you can run `yarn start` to fire up the application.
