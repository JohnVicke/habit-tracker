import { ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { add, isSameDay, previousMonday } from "date-fns";
import { H3, XStack, YStack } from "tamagui";

import type { FragmentType } from "@ht/api/client";
import { getFragmentData } from "@ht/api/client";

import { HabitFragment } from "~/graphql/fragments/habit";
import { Entry } from "./entry";

interface HabitProps {
  habit: FragmentType<typeof HabitFragment>;
}

export function Habit(props: HabitProps) {
  const habit = getFragmentData(HabitFragment, props.habit);
  return (
    <YStack space={4} key={habit.id}>
      <Link href={`/(main)/(modals)/habit/${habit.id}`}>
        <H3>{habit.name}</H3>
      </Link>
      <ScrollView horizontal>
        <XStack space>
          {new Array(7).fill(null).map((_, index) => {
            const today = new Date();
            const prevMonday = previousMonday(today);
            const day = add(prevMonday, { days: index });

            const entryOnDay = habit.entries?.find((entry) =>
              isSameDay(entry.day, day),
            );

            return (
              <Entry
                key={`date-entry-${index}-${day.getTime()}`}
                habitId={habit.id}
                entry={entryOnDay}
                day={day}
              />
            );
          })}
        </XStack>
      </ScrollView>
    </YStack>
  );
}
