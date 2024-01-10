import type { HttpOptions } from "@apollo/client";
import Constants from "expo-constants";
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { secureStore } from "./secure-store";

const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    );
  }
  return `http://${localhost}:4000`;
};

export function createApolloClient() {
  const errorLink = onError(({ forward, operation, graphQLErrors }) => {
    if (!graphQLErrors) return;

    for (const err of graphQLErrors) {
      switch (err.extensions?.code) {
        case "UNAUTHENTICATED": {
          void secureStore.deleteItem("session_token");
          break;
        }
      }
    }

    forward(operation);
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await secureStore.getItem("session_token");
    return {
      headers: {
        ...(headers as HttpOptions["headers"]),
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = createHttpLink({
    uri: `${getBaseUrl()}/graphql`,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, httpLink]),
  });
}
