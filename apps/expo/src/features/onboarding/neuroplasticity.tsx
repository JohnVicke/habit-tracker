import { router } from "expo-router";

import { OnboardingScreen } from "./onboarding-screen";

export function Neuroplasticity() {
  return (
    <OnboardingScreen
      screen="neuroplasticity"
      nextScreen={() => router.push("/getting-started")}
      previousScreen={() => router.push("/habit-loop")}
    >
      <OnboardingScreen.Title>Neuroplasticity</OnboardingScreen.Title>
      <OnboardingScreen.Description>
        Your brain is incredibly adaptable. Through neuroplasticity, repeated
        behaviors strengthen neural connections. Embrace the power of
        consistency – every repetition counts.
      </OnboardingScreen.Description>
    </OnboardingScreen>
  );
}
