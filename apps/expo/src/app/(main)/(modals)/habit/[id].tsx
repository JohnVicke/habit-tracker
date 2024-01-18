import { useLocalSearchParams } from "expo-router";
import { Text } from "tamagui";

import { Screen } from "~/components/screen";
import { Habit } from "~/features/habits/habit";

export default function HabitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Habit id={id} />;
}
