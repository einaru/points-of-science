import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";
import Constants from "expo-constants";
import * as Storage from "../storage";

async function fetchNewToken() {
  const { apiEndpoint } = Constants.manifest.extra;
  const refreshToken = await Storage.getItem("refreshToken");
  return fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetToken($refreshToken: String!) {
          getNewToken(refreshToken: $refreshToken) {
            accessToken
          }
        }
      `,
      variables: { refreshToken },
    }),
  });
}

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      // eslint-disable-next-line consistent-return
      graphQLErrors.forEach((error) => {
        if (error.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(fetchNewToken())
            .filter((value) => Boolean(value))
            .flatMap((accessToken) => {
              const { headers } = operation.getContext();
              operation.setContext({
                headers: {
                  ...headers,
                  authorization: `Bearer ${accessToken}`,
                },
              });
              return forward(operation);
            });
        }
      });
    }
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      console.debug("GraphQL Errors:", graphQLErrors);
      console.debug("Network Error:", networkError);
    }
  }
);

export default errorLink;
