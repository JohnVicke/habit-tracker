import { Stack } from "expo-router";

const modalOptions = {
  presentation: "modal",
} as const;

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={modalOptions} />
      <Stack.Screen name="sign-up" options={modalOptions} />
    </Stack>
  );
}
