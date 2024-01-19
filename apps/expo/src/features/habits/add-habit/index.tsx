import React from "react";
import { KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/button";
import { Screen } from "~/components/screen";
import { TextField } from "~/components/text-field";
import { Typography } from "~/components/typography";
import { useCreateHabitMutation } from "~/graphql/mutations/create-habit";
import { ColorSelectField } from "./color-select-field";
import { EmojiSelectField } from "./emoji-select-field";
import { NotificiationSelectField } from "./notification-select-field";
import { StreakSelectField } from "./streak-select-field";

const dayValueSchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

const dayLabelSchema = z.enum(["M", "T", "W", "T", "F", "S", "S"]);

const intervalSchema = z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]);

const schema = z.object({
  name: z.string().min(1),
  interval: intervalSchema,
  occurances: z.number().min(1),
  reminder: z.array(z.object({ value: dayValueSchema, label: dayLabelSchema })),
  description: z.string().optional(),
  emoji: z.string().optional(),
  color: z.string().optional(),
});

export type AddHabitFormValues = z.infer<typeof schema>;

export function AddHabit() {
  const isPresented = router.canGoBack();

  const { mutate, loading } = useCreateHabitMutation();

  const { handleSubmit, control } = useForm<AddHabitFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      occurances: 1,
      reminder: [],
    },
  });

  const goBack = () => {
    if (!router.canGoBack()) {
      return router.push("/(main)/(tabs)/dashboard");
    }
    return router.back();
  };

  return (
    <Screen>
      <Button onPress={goBack}>Go back</Button>
      <View className="flex-1 justify-between">
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
            <Controller
              control={control}
              name="interval"
              render={({ field }) => {
                return (
                  <StreakSelectField
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Frequency"
                    label="Frequency"
                    showOccurance={!!field.value}
                    occuranceField={() => (
                      <Controller
                        control={control}
                        name="occurances"
                        render={({ field: occuranceField }) => (
                          <View className="flex-row items-center justify-between gap-x-2 rounded bg-slate-200 py-1 pl-2 pr-1">
                            <View className="flex-row gap-2">
                              <Typography>{occuranceField.value} /</Typography>
                              <Typography>{field.value}</Typography>
                            </View>
                            <View className="flex-row gap-x-1">
                              <TouchableOpacity
                                className="rounded-l bg-slate-800 p-2"
                                onPress={() => {
                                  if (occuranceField.value < 2) {
                                    return;
                                  }
                                  occuranceField.onChange(
                                    occuranceField.value - 1,
                                  );
                                }}
                              >
                                <Minus className="text-slate-100" />
                              </TouchableOpacity>
                              <TouchableOpacity
                                className="rounded-r bg-slate-800 p-2"
                                onPress={() =>
                                  occuranceField.onChange(
                                    occuranceField.value + 1,
                                  )
                                }
                              >
                                <Plus className="text-slate-100" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      />
                    )}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="reminder"
              render={({ field }) => (
                <NotificiationSelectField
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Reminder"
                  label="Reminder"
                />
              )}
            />
          </View>
          <EmojiSelectField label="Emoji" control={control} name="emoji" />
          <ColorSelectField label="Color" control={control} name="color" />
        </View>
        <Button>Create habit</Button>
      </View>
    </Screen>
  );
}
