import { Text, View } from "react-native";
import { Link } from "expo-router";

import { Screen } from "~/components/screen";

export function Auth() {
  return (
    <Screen>
      <Text>track your {"\n"}habits</Text>
      <View>
        <Link href="/(auth)/sign-in" asChild>
          Sign in
        </Link>
        <Link href="/(auth)/sign-up" asChild>
          Sign up
        </Link>
      </View>
    </Screen>
  );
}
