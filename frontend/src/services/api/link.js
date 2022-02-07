import { ApolloLink } from "@apollo/client";
import authLink from "./authLink";
import errorLink from "./errorLink";
import httpLink from "./httpLink";

export default ApolloLink.from([errorLink, authLink.concat(httpLink)]);
