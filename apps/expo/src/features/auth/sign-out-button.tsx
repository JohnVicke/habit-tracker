import { useAuth } from "@clerk/clerk-expo";

import { Button } from "~/components/button";

export const SignOutButton = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return <Button onPress={signOut}>Sign out</Button>;
};
