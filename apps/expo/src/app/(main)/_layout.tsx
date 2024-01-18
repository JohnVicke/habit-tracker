import { Text } from "react-native";
import { Redirect, Slot } from "expo-router";

import { useSession } from "~/features/auth/use-session";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
