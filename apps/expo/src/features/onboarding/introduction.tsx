import { router } from "expo-router";

import { Typography } from "~/components/typography";
import { OnboardingScreen } from "./onboarding-screen";

export function Introduction() {
  return (
    <OnboardingScreen
      screen="introduction"
      nextScreen={() => router.push("/(onboarding)/habit-loop")}
    >
      <OnboardingScreen.Title>Crafting your future self</OnboardingScreen.Title>
      <OnboardingScreen.Description>
        Welcome to{" "}
        <Typography size="xl" bold>
          Vana!
        </Typography>{" "}
        Your path to becoming the best version of yourself starts with the
        choices you make right now. Let&apos;s embark on a journey to shape your
        future through intentional habits.
      </OnboardingScreen.Description>
    </OnboardingScreen>
  );
}
