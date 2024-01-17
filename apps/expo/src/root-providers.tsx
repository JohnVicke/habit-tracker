import { useColorScheme } from "react-native";
import { ApolloProvider } from "@apollo/client";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { AuthProvider } from "./features/auth/use-session";
import { createApolloClient } from "./utils/apollo-client";

export function RootProviders(props: React.PropsWithChildren) {
  const theme = useColorScheme() ?? "light";
  return (
    <AuthProvider>
      <ApolloProvider client={createApolloClient()}>
        <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
          {props.children}
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
