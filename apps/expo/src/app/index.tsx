import { Text } from "react-native";
import { Redirect } from "expo-router";

import { useOnboardingStep } from "~/features/onboarding/use-onboarding-step";

export default function LandingPage() {
  const { screens, isLoading: onboardingLoading } = useOnboardingStep();

  if (onboardingLoading) {
    return <Text>Loading...</Text>;
  }

  if (!screens.introduction) {
    return <Redirect href="/(onboarding)/introduction" />;
  }

  if (!screens.habitLoop) {
    return <Redirect href="/(onboarding)/habit-loop" />;
  }

  if (!screens.neuroplasticity) {
    return <Redirect href="/(onboarding)/neuroplasticity" />;
  }

  if (!screens.gettingStarted) {
    return <Redirect href="/(onboarding)/getting-started" />;
  }

  return <Redirect href="/(auth)/auth" />;
}
