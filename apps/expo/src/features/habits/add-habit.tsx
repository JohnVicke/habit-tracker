import React from "react";
import { Text, View } from "react-native";
import { Link, router } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { ColorSelectField } from "~/components/color-select-field";
import { EmojiSelectField } from "~/components/emoji-select-field";
import { NotificiationSelectField } from "~/components/notification-select-field";
import { Screen } from "~/components/screen";
import { StreakSelectField } from "~/components/streak-select-field";
import { TextField } from "~/components/text-field";
import { useCreateHabitMutation } from "~/graphql/mutations/create-habit";

const schema = z.object({
  name: z.string().min(1),
  frequency: z.number(),
  type: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  reminder: z.enum(["MORNING", "AFTERNOON", "EVENING"]),
  description: z.string().optional(),
  emoji: z.string().optional(),
  color: z.string().optional(),
});

const typeSelectItems = [
  {
    value: "DAILY",
    displayValue: "Daily",
  },
  {
    value: "WEEKLY",
    displayValue: "Weekly",
  },
  {
    value: "MONTHLY",
    displayValue: "Monthly",
  },
  {
    value: "YEARLY",
    displayValue: "Yearly",
  },
] as const;

type FormValues = z.infer<typeof schema>;

export function AddHabit() {
  const isPresented = router.canGoBack();

  const { mutate, loading } = useCreateHabitMutation();

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      frequency: 1,
      type: "WEEKLY",
    },
  });

  return (
    <Screen>
      <BottomSheetModalProvider>
        <View className="gap-y-4">
          <TextField
            control={control}
            name="name"
            placeholder="Workout"
            label="Name"
          />
          <TextField
            control={control}
            name="description"
            label="Description"
            placeholder="Workout three times a week"
          />
          <View className="flex-row gap-x-2">
            <StreakSelectField
              label="Streak"
              control={control}
              name="frequency"
            />
            <NotificiationSelectField
              label="Reminder"
              control={control}
              name="reminder"
            />
          </View>
          <EmojiSelectField label="Emoji" control={control} name="emoji" />
          <ColorSelectField label="Color" control={control} name="color" />
        </View>
      </BottomSheetModalProvider>
    </Screen>
  );
}
