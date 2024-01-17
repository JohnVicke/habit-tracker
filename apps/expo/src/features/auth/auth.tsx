import { Link } from "expo-router";

import { Screen } from "~/components/screen";

export function Auth() {
  return (
    <Screen>
      <Link href="/(auth)/sign-in">Sign in</Link>
      <Link href="/(auth)/sign-up">Sign up</Link>
    </Screen>
  );
}
