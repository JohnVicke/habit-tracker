import { Text } from "react-native";

import { Screen } from "~/components/screen";

export function Habit() {
  return (
    <Screen>
      <Text onPress={console.log}>Remove Habit</Text>
    </Screen>
  );
}
