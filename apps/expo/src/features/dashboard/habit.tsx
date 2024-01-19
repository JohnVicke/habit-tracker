import { Text, View } from "react-native";

import type { FragmentType } from "@ht/api/client";
import { getFragmentData } from "@ht/api/client";

import { Button } from "~/components/button";
import { HabitFragment } from "~/graphql/fragments/habit";

interface HabitProps {
  habit: FragmentType<typeof HabitFragment>;
}

export function Habit(props: HabitProps) {
  const habit = getFragmentData(HabitFragment, props.habit);
  return (
    <View className="rounded-xl border border-slate-300 bg-slate-100 p-4 shadow shadow-slate-200">
      <Text className="font-qs-bold text-2xl">{habit.name}</Text>
      <Button>Complete</Button>
    </View>
  );
}
