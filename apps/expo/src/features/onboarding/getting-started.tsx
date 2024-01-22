import { router } from "expo-router";

import { OnboardingScreen } from "./onboarding-screen";

export function GettingStarted() {
  return (
    <OnboardingScreen
      screen="gettingStarted"
      nextScreen={() => router.push("/(auth)/auth")}
      previousScreen={() => router.push("/neuroplasticity")}
    >
      <OnboardingScreen.Title>Debunking the 21-Day Myth</OnboardingScreen.Title>
      <OnboardingScreen.Description>
        Contrary to popular belief, habit formation varies. Research suggests it
        takes an average of 66 days to establish a habit. Be patient and
        persistent; your efforts will pay off.
      </OnboardingScreen.Description>
    </OnboardingScreen>
  );
}
