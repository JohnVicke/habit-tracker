import { Stack } from "expo-router";

const modalOptions = {
  presentation: "modal",
} as const;

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add-habit" options={modalOptions} />
      {/* <Stack.Screen name="/habit/[id]" options={modalOptions} /> */}
    </Stack>
  );
}
