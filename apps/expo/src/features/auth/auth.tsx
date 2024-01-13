import { Link } from "expo-router";
import { Button, H1, YStack } from "tamagui";

import { Screen } from "~/components/screen";

export function Auth() {
  return (
    <Screen>
      <H1 flex={1}>track your {"\n"}habits</H1>
      <YStack space>
        <Button>
          <Link href="/(auth)/sign-in">Sign in</Link>
        </Button>
        <Button>
          <Link href="/(auth)/sign-up">Sign up</Link>
        </Button>
      </YStack>
    </Screen>
  );
}
