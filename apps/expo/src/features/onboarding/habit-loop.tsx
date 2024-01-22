import { router } from "expo-router";

import { OnboardingScreen } from "./onboarding-screen";

export function HabitLoop() {
  return (
    <OnboardingScreen
      screen="habitLoop"
      nextScreen={() => router.push("/neuroplasticity")}
      previousScreen={() => router.push("/introduction")}
    >
      <OnboardingScreen.Title>The Habit Loop</OnboardingScreen.Title>
      <OnboardingScreen.Description>
        Habits are formed through a loop of cue, routine, and reward. Identify
        triggers (cues), establish your routine, and enjoy the rewards. This
        loop rewires your brain for lasting change.
      </OnboardingScreen.Description>
    </OnboardingScreen>
  );
}
