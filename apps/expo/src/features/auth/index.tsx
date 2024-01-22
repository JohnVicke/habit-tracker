import { View } from "react-native";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { Button } from "~/components/button";
import { Screen } from "~/components/screen";
import { Typography } from "~/components/typography";

export function Auth() {
  const auth = useAuth();

  if (!auth.isLoaded) {
    return <Typography>Loading...</Typography>;
  }

  if (auth.isSignedIn) {
    return <Redirect href="/(main)/(tabs)/dashboard" />;
  }

  return (
    <Screen>
      <View className="h-full justify-between">
        <Typography size="xxl" bold>
          Vana!
        </Typography>
        <View className="gap-y-4">
          <Link href="/(auth)/sign-in" asChild>
            <Button>Sign in</Button>
          </Link>
          <Link href="/(auth)/sign-up" asChild>
            <Button>Sign up</Button>
          </Link>
        </View>
      </View>
    </Screen>
  );
}
