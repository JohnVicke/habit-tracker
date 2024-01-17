import { Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";

import type { FragmentType } from "@ht/api/client";
import { getFragmentData } from "@ht/api/client";

import { HabitEntryFragment, useCreateHabitEntryMutation } from "./graphql";

interface EntryProps {
  habitId: string;
  day: Date;
  entry?: FragmentType<typeof HabitEntryFragment>;
}

export function Entry(props: EntryProps) {
  const { mutate } = useCreateHabitEntryMutation();

  const entry = props.entry
    ? getFragmentData(HabitEntryFragment, props.entry)
    : null;

  const dayOfMonth = format(props.day, "dd");
  const weekDay = format(props.day, "iiiii");

  return (
    <View key={`date-${entry?.id}`} className="flex items-center gap-y-2">
      <TouchableOpacity
        onPress={() => {
          void mutate({
            variables: {
              input: { day: props.day, habitId: props.habitId },
            },
          });
        }}
      >
        <Text>{dayOfMonth}</Text>
      </TouchableOpacity>
      <Text>{weekDay}</Text>
    </View>
  );
}
