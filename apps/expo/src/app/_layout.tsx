import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";

import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { RootProviders } from "~/root-providers";
import { tamaguiFonts } from "~/tamagui/tamagui-fonts";

export default function RootLayout() {
  const [loaded] = useFonts(tamaguiFonts);

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <RootProviders>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar />
      </SafeAreaProvider>
    </RootProviders>
  );
}
