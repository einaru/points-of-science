import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import link from "./link";

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  storage: new AsyncStorageWrapper(AsyncStorage),
});

function useApiClient() {
  const [client, setClient] = useState(null);

  useEffect(() => {
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
