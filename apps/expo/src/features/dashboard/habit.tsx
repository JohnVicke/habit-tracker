import { ScrollView } from "react-native";
import { add, isSameDay } from "date-fns";
import { H3, XStack, YStack } from "tamagui";

import type { FragmentType } from "@ht/api/client";
import { getFragmentData } from "@ht/api/client";

import { Entry } from "./entry";
import { HabitFragment } from "./graphql";

interface HabitProps {
  habit: FragmentType<typeof HabitFragment>;
}

export function Habit(props: HabitProps) {
  const habit = getFragmentData(HabitFragment, props.habit);
  return (
    <YStack space={4} key={habit.id}>
      <H3>{habit.name}</H3>
      <ScrollView horizontal>
        <XStack space>
          {new Array(7).fill(null).map((_, index) => {
            const today = new Date();
            const day = add(today, { days: index });

            const entryOnDay = habit.entries?.find((entry) =>
              isSameDay(entry.day, day),
            );

            return (
              <Entry
                key={`date-entry-${index}-${day.getTime()}`}
                habitId={habit.id}
                entry={entryOnDay}
                day={add(new Date(), { days: index })}
              />
            );
          })}
        </XStack>
      </ScrollView>
    </YStack>
  );
}
