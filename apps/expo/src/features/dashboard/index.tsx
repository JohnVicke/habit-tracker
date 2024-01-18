import { ScrollView, YStack } from "tamagui";

import { Screen } from "~/components/screen";
import { useHabitsQuery } from "~/graphql/queries/habits";
import { Habit } from "./habit";

export function Dashboard() {
  const { data } = useHabitsQuery();

  return (
    <Screen>
      <ScrollView>
        <YStack>{data?.habits.map((habit) => <Habit habit={habit} />)}</YStack>
      </ScrollView>
    </Screen>
  );
}
