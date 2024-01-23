import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
    </Stack>
  );
}
