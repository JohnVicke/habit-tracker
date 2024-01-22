import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";

import type { OAuthStrategy } from "./oauth-button";
import { useWarmUpBrowser } from "~/hooks/use-warmup-browser";
import { OAuthButton } from "./oauth-button";

const strategies = ["google", "apple"] satisfies OAuthStrategy[];

WebBrowser.maybeCompleteAuthSession();

export const SignIn = () => {
  useWarmUpBrowser();

  return (
    <View className="mt-4 gap-y-4">
      {strategies.map((strategy) => (
        <OAuthButton key={`sign-in-${strategy}`} strategy={strategy} />
      ))}
    </View>
  );
};
