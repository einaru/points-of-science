/* eslint-disable no-console */
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    console.debug("GraphQL Errors:", graphQLErrors);
    console.debug("Network Error:", networkError);
  }
});

export default errorLink;
