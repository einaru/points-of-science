import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (__DEV__) {
    console.debug("GraphQL Errors:", graphQLErrors);
    console.debug("Network Error:", networkError);
  }
});

export default errorLink;
