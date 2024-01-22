import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "vana",
  slug: "habit-tracker",
  scheme: "expo",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/vana.png",
  userInterfaceStyle: "automatic",
  splash: {
    foregroundImage: "./assets/vana.png",
    backgroundColor: "#ECFDF5",
    resizeMode: "contain",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.johnvicke.ht",
    supportsTablet: true,
  },
  android: {
    package: "com.johnvicke.ht",
    adaptiveIcon: {
      foregroundImage: "./assets/vana.png",
      backgroundColor: "#ECFDF5",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js"],
  extra: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    eas: {
      projectId: "cee0bb0f-5eff-48a6-b192-50f028298705",
    },
  },
});

export default defineConfig;
