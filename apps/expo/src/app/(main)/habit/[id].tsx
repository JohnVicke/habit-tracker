import { useLocalSearchParams } from "expo-router";

import { Habit } from "~/features/habits/habit";

export default function HabitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Habit id={id} />;
}
