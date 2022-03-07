import { ApolloLink, Observable } from "@apollo/client";
import Constants from "expo-constants";
import { print } from "graphql";
import { createClient } from "graphql-ws";

class WebSocketLink extends ApolloLink {
  constructor(options) {
    super();
    this.client = createClient(options);
  }

  request(operation) {
    return new Observable((sink) => {
      return this.client.subscribe(
        {
          ...operation,
          query: print(operation.query),
        },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        }
      );
    });
  }
}

const { wsEndpoint } = Constants.manifest.extra;

const wsLink = new WebSocketLink({
  url: wsEndpoint,
  lazy: false,
});

export default wsLink;
