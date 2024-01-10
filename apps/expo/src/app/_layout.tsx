import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";

import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "~/utils/apollo-client";

export default function RootLayout() {
  return (
    <ApolloProvider client={createApolloClient()}>
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
