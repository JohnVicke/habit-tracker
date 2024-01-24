import React from "react";
import { TextInput, View } from "react-native";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/button";
import { Screen } from "~/components/screen";
import { Typography } from "~/components/typography";
import { trpc } from "~/utils/trpc";

const schema = z.object({
  name: z.string().min(1),
});

export type AddHabitFormValues = z.infer<typeof schema>;

export function AddHabit() {
  const mutation = trpc.habit.create.useMutation({
    onSuccess(data) {
      goBack();
    },
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
  });

  const { handleSubmit, control } = useForm<AddHabitFormValues>({
    resolver: zodResolver(schema),
  });

  const goBack = () => {
    if (!router.canGoBack()) {
      return router.push("/(main)/(dashboard)/dashboard");
    }
    return router.back();
  };

  return (
    <Screen>
      {!router.canGoBack && <Button onPress={goBack}>Go back</Button>}
      <View className="flex-1 gap-y-4 self-center">
        <Typography bold size="xxl">
          Start a new Vana!
        </Typography>
        <Typography>
          Tip: Start with a verb, like &qout;Read&qout; or &qout;Exercise&qout;,
          and keep it short so you can easily check it off each day.
        </Typography>
        <View className="mt-20 gap-y-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => {
              return (
                <TextInput
                  autoFocus
                  onBlur={handleSubmit((data) => {
                    void mutation.mutate({ name: data.name });
                  })}
                  onChange={(e) => field.onChange(e.nativeEvent.text)}
                  className="self-center font-qs-regular text-7xl text-slate-200"
                  selectionColor="#fff"
                  placeholder="Exercise"
                />
              );
            }}
          />
        </View>
      </View>
    </Screen>
  );
}
