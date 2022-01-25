import React from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { StatusBar } from "expo-status-bar";
import { Provider as ThemeProvider } from "react-native-paper";
import { AuthProvider } from "./src/services/auth/AuthProvider";
import Navigation from "./src/Navigation";
import * as Storage from "./src/services/storage";

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

const authLink = setContext(async (_, { headers }) => {
  const token = await Storage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });
const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
        <StatusBar style="auto" />
      </ApolloProvider>
    </ThemeProvider>
  );
}
