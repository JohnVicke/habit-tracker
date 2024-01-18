import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootProviders } from "~/root-providers";

export default function RootLayout() {
  return (
    <RootProviders>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar />
      </SafeAreaProvider>
    </RootProviders>
  );
}
