import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import authLink from "./authLink";
import errorLink from "./errorLink";
import httpLink from "./httpLink";

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
