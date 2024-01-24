import { Text } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { useOnboardingQuery } from "~/features/onboarding/use-onboarding";

export default function LandingPage() {
  const { data, isLoading: onboardingLoading } = useOnboardingQuery();

  const auth = useAuth();

  if (onboardingLoading || !data || !auth.isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (auth.isSignedIn) {
    return <Redirect href="/(main)/(dashboard)/dashboard" />;
  }

  if (!data?.introduction) {
    return <Redirect href="/(onboarding)/introduction" />;
  }

  if (!data.habitLoop) {
    return <Redirect href="/(onboarding)/habit-loop" />;
  }

  if (!data.neuroplasticity) {
    return <Redirect href="/(onboarding)/neuroplasticity" />;
  }

  if (!data.gettingStarted) {
    return <Redirect href="/(onboarding)/getting-started" />;
  }

  return <Redirect href="/(auth)/auth" />;
}
