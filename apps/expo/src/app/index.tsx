import { Redirect } from "expo-router";
import { H1 } from "tamagui";

import { useSession } from "~/features/auth/use-session";

export default function LandingPage() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <H1>Loading...</H1>;
  }

  if (session) {
    return <Redirect href="/(main)/(tabs)/dashboard" />;
  }

  return <Redirect href="/(auth)/auth" />;
}
