import { Redirect, Slot } from "expo-router";
import { H1 } from "tamagui";

import { useSession } from "~/features/auth/use-session";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <H1>Loading...</H1>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
