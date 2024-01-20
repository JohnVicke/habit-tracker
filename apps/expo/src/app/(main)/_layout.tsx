import { Text, View } from "react-native";
import { Redirect, Slot } from "expo-router";

import { Typography } from "~/components/typography";
import { useSession } from "~/features/auth/use-session";
import { useOnboardingStep } from "~/features/onboarding/use-onboarding-step";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  const { screens, isLoading: onboardingLoading } = useOnboardingStep();

  if (isLoading) {
    return (
      <View>
        <Typography>Loading...</Typography>
      </View>
    );
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  if (!screens.introduction) {
    return <Redirect href="/introduction" />;
  }

  if (!screens.habitLoop) {
    return <Redirect href="/habit-loop" />;
  }

  if (!screens.neuroplasticity) {
    return <Redirect href="/neuroplasticity" />;
  }

  if (!screens.gettingStarted) {
    return <Redirect href="/getting-started" />;
  }

  return <Slot />;
}
