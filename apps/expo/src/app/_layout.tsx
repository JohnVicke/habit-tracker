import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";

import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "~/utils/apollo-client";

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f472b6",
          },
        }}
      />
      <StatusBar />
    </ApolloProvider>
  );
}
