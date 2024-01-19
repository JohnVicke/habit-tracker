import { ActivityIndicator } from "react-native";
import { ApolloProvider } from "@apollo/client";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
  useFonts,
} from "@expo-google-fonts/quicksand";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { AuthProvider } from "./features/auth/use-session";
import { createApolloClient } from "./graphql/create-apollo-client";

const client = createApolloClient();

export function RootProviders(props: React.PropsWithChildren) {
  const [loaded, error] = useFonts({
    Quicksand_700Bold,
    Quicksand_300Light,
    Quicksand_500Medium,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
  });

  if (!loaded && !error) {
    return <ActivityIndicator />;
  }

  return (
    <BottomSheetModalProvider>
      <AuthProvider>
        <ApolloProvider client={client}>{props.children}</ApolloProvider>
      </AuthProvider>
    </BottomSheetModalProvider>
  );
}
