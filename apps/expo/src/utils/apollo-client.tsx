import Constants from "expo-constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";

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

export const apolloClient = new ApolloClient({
  uri: `${getBaseUrl()}/graphql`,
  cache: new InMemoryCache(),
});
