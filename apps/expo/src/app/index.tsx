import { Text } from "react-native";
import { Redirect } from "expo-router";

import { useSession } from "~/features/auth/use-session";

export default function LandingPage() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return <Redirect href="/(main)/(tabs)/dashboard" />;
  }

  return <Redirect href="/(auth)/auth" />;
}
