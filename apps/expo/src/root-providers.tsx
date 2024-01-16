import { Platform, useColorScheme } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { useApolloClientDevTools } from "@dev-plugins/apollo-client";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TamaguiProvider } from "tamagui";

import { AuthProvider } from "./features/auth/use-session";
import { createApolloClient } from "./graphql/create-apollo-client";
import config from "./tamagui";

const client = createApolloClient();

export function RootProviders(props: React.PropsWithChildren) {
  const theme = useColorScheme() ?? "light";
  // useApolloClientDevTools(client);
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <TamaguiProvider
          config={config}
          defaultTheme={theme}
          disableInjectCSS={Platform.OS !== "web"}
        >
          <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
            {props.children}
          </ThemeProvider>
        </TamaguiProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
