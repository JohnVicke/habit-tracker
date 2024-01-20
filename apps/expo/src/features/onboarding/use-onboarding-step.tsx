import React from "react";
import { router } from "expo-router";

import { secureStore } from "~/utils/secure-store";

export type OnboardingScreens = NonNullable<
  Awaited<ReturnType<typeof secureStore.getItem<"onboarding">>>
>;

export function useOnboardingStep() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [screens, setScreens] = React.useState<OnboardingScreens>({});

  async function completeStep(step: keyof OnboardingScreens) {
    setScreens((old) => ({ ...old, [step]: true }));
    await secureStore.setItem("onboarding", screens);

    if (!screens.introduction) {
      return router.push("/introduction");
    }

    if (!screens.habitLoop) {
      return router.push("/habit-loop");
    }

    if (!screens.neuroplasticity) {
      return router.push("/neuroplasticity");
    }

    if (!screens.gettingStarted) {
      return router.push("/getting-started");
    }

    router.push("/");
  }

  React.useEffect(() => {
    const fetchFromStorage = async () => {
      setScreens(
        (await secureStore.getItem("onboarding")) ??
          ({
            habitLoop: false,
            neuroplasticity: false,
            introduction: false,
            gettingStarted: false,
          } satisfies OnboardingScreens),
      );
      setIsLoading(false);
    };

    void fetchFromStorage();
  }, []);

  return { screens, isLoading, completeStep };
}
