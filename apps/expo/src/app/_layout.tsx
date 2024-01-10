import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";

import { ActivityIndicator } from "react-native";
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
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f472b6",
          },
        }}
      />
      <StatusBar />
    </RootProviders>
  );
}
