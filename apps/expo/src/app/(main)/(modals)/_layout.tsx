import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { Typography } from "~/components/typography";

const modalOptions = {
  presentation: "modal",
} as const;

export default function ModalsLayout() {
  const auth = useAuth();

  if (!auth.isLoaded) {
    return <Typography>Loading..</Typography>;
  }

  if (!auth.isSignedIn) {
    return <Redirect href="/(auth)/auth" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add-habit" options={{ presentation: "modal" }} />
      <Stack.Screen name="habit/[id]" options={modalOptions} />
    </Stack>
  );
}
