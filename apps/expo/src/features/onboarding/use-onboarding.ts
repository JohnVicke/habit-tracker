import * as SecureStore from "expo-secure-store";
import { useMutation, useQuery } from "@tanstack/react-query";

export type OnboardingScreenName =
  | "introduction"
  | "habitLoop"
  | "neuroplasticity"
  | "gettingStarted";

const names = [
  "introduction",
  "habitLoop",
  "neuroplasticity",
  "gettingStarted",
] as const;

type OnboardingStore = {
  [key in OnboardingScreenName]: boolean;
};

export function useOnboardingQuery() {
  return useQuery({
    queryKey: ["onboarding"],
    queryFn: async () => {
      const screens = await Promise.all(
        names.map((screen) => SecureStore.getItemAsync(`onboarding-${screen}`)),
      );

      return screens.reduce((acc, screen, index) => {
        acc[names[index]!] = screen === "complete";
        return acc;
      }, {} as OnboardingStore);
    },
    staleTime: Infinity,
  });
}

export function useOnboardingMutation() {
  return useMutation({
    mutationFn: async (screen: OnboardingScreenName) => {
      return SecureStore.setItemAsync(`onboarding-${screen}`, "complete");
      // const screens = await Promise.all(
      //   names.map((screen) =>
      //     SecureStore.deleteItemAsync(`onboarding-${screen}`),
      //   ),
      // );
      // return true;
    },
  });
}
