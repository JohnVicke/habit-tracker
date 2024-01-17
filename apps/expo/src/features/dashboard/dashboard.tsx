import { Link } from "expo-router";
import { ScrollView, YStack } from "tamagui";

import { Screen } from "~/components/screen";
import { useHabitsQuery } from "./graphql";
import { Habit } from "./habit";

export function Dashboard() {
  const habitRes = useHabitsQuery();

  return (
    <Screen>
      <ScrollView>
        <YStack>
          {habitRes?.data?.habits.map((habit) => <Habit habit={habit} />)}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
