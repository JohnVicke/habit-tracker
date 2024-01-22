import type { ExpoConfig } from "@expo/config-types";

declare module "expo-constants" {
  export class Constants {
    expoConfig: ExpoConfig & {
      hostUri?: string;
      extra: ExpoConfig["extra"] & {
        clerkPublishableKey: string;
      };
    };
  }
}
