import { onError } from "@apollo/client/link/error";

// See: https://stackoverflow.com/a/56927782
const errorLink = onError(({ graphQLErrors, networkErrors: networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location:`,
        locations,
        `Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export default errorLink;
