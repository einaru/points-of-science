import { ApolloLink, concat, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import authLink from "./authLink";
import errorLink from "./errorLink";
import httpLink from "./httpLink";
import wsLink from "./wsLink";

export default split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  ApolloLink.from([errorLink, concat(authLink, httpLink)])
);
