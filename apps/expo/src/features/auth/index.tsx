import { Link } from "expo-router";
import { Button, H1, YStack } from "tamagui";

import { Screen } from "~/components/screen";

export function Auth() {
  return (
    <Screen>
      <H1 flex={1}>track your {"\n"}habits</H1>
      <YStack space>
        <Link href="/(auth)/sign-in" asChild>
          <Button themeInverse>Sign in</Button>
        </Link>
        <Link href="/(auth)/sign-up" asChild>
          <Button themeInverse>Sign up</Button>
        </Link>
      </YStack>
    </Screen>
  );
}
