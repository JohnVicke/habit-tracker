import { Link } from "expo-router";
import { Plus } from "@tamagui/lucide-icons";
import { Button, YStack } from "tamagui";

import { Screen } from "~/components/screen";
import { useHabitsQuery } from "~/graphql/queries/habits";
import { Habit } from "./habit";

export function Dashboard() {
  const { data } = useHabitsQuery();

  return (
    <Screen>
      <YStack>{data?.habits.map((habit) => <Habit habit={habit} />)}</YStack>
      <Link asChild href="/(main)/(modals)/add-habit">
        <Button
          theme="purple"
          height="$4"
          width="$4"
          borderRadius={200}
          alignSelf="center"
          icon={Plus}
          position="absolute"
          bottom="$4"
          right="$4"
        />
      </Link>
    </Screen>
  );
}
