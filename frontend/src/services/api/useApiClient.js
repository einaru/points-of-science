import { ApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import React from "react";

import cache from "./cache";
import link from "./link";

const persistor = new CachePersistor({
  cache,
  storage: new AsyncStorageWrapper(AsyncStorage),
});

function useApiClient() {
  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    const initCache = async () => {
      await persistor.restore();
      const apolloClient = new ApolloClient({
        link,
        cache,
        defaultOptions: {
          watchQuery: {
            fetchPolicy: "network-only",
          },
        },
      });
      apolloClient.onClearStore(async () => {
        await persistor.purge();
      });
      setClient(apolloClient);
    };
    initCache();
  }, []);

  return client;
}

export default useApiClient;
