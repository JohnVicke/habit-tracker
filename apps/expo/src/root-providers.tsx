import { Platform, useColorScheme } from "react-native";
import { ApolloProvider } from "@apollo/client";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TamaguiProvider } from "tamagui";

import { AuthProvider } from "./features/auth/use-session";
import config from "./tamagui";
import { createApolloClient } from "./utils/apollo-client";

export function RootProviders(props: React.PropsWithChildren) {
  const theme = useColorScheme() ?? "light";
  return (
    <AuthProvider>
      <ApolloProvider client={createApolloClient()}>
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
