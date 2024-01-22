import { ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider } from "@clerk/clerk-expo";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
  useFonts,
} from "@expo-google-fonts/quicksand";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { TRPCProvider } from "./utils/api";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

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
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    >
      <TRPCProvider>
        <BottomSheetModalProvider>{props.children}</BottomSheetModalProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
}
