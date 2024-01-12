import { Link } from "expo-router";
import { Button } from "tamagui";

import { Screen } from "~/components/screen";

export function Auth() {
  return (
    <Screen>
      <Button theme="purple">
        <Link href="/(auth)/sign-in">Sign in</Link>
      </Button>
      <Button theme="purple">
        <Link href="/(auth)/sign-up">Sign up</Link>
      </Button>
    </Screen>
  );
}
