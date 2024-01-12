import React from "react";
import { Link, router } from "expo-router";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "@tamagui/lucide-icons";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  H3,
  Input,
  Label,
  Spinner,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { z } from "zod";

import { graphql } from "@ht/api/client";

import { CustomSelect } from "~/components/custom-select";
import { Screen } from "~/components/screen";

const createHabitMutation = graphql(/* GraphQL */ `
  mutation CreateHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
      description
      endDate
      frequency
      type
      name
      id
      userId
      createdAt
    }
  }
`);

const schema = z.object({
  name: z.string(),
  frequency: z.number(),
  type: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  description: z.string().optional(),
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

  const [mutate, { loading }] = useMutation(createHabitMutation, {
    onCompleted(data) {
      console.log(data);
    },
  });
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "workout",
      frequency: 1,
      type: "DAILY",
    },
  });

  return (
    <Screen>
      <YStack space>
        {!isPresented && <Link href="/(main)/(tabs)/dashboard">Go back</Link>}
        <Form
          onSubmit={handleSubmit((data) => {
            void mutate({ variables: { input: data } });
          })}
        >
          <YStack space>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <YStack>
                  <Label htmlFor="name">Name</Label>
                  <Text>{fieldState.error?.message}</Text>
                  <Input {...field} id="name" placeholder="Workout" />
                </YStack>
              )}
            />
            <YStack>
              <Label>Frequency</Label>
              <XStack space alignItems="center">
                <Controller
                  control={control}
                  name="frequency"
                  render={({
                    field: { onChange, value, ...rest },
                    fieldState,
                  }) => {
                    return (
                      <>
                        <Input
                          {...rest}
                          value={value ? value.toString() : ""}
                          onChange={(e) => {
                            onChange(
                              parseInt(
                                e.nativeEvent.text.replace(/[^0-9]/g, ""),
                                10,
                              ),
                            );
                          }}
                          keyboardType="numeric"
                          id="frequency"
                        />

                        <Text>{fieldState.error?.message}</Text>
                      </>
                    );
                  }}
                />
                <H3 opacity={0.5}>/</H3>
                <Controller
                  control={control}
                  name="type"
                  render={({ field, fieldState }) => (
                    <>
                      <CustomSelect
                        width={150}
                        values={typeSelectItems}
                        groupLabel="Type"
                        displayValue={(value) => value.displayValue}
                        getValue={(value) => value.value}
                        defaultValue={typeSelectItems[1]}
                        {...field}
                      />
                      <Text>{fieldState.error?.message}</Text>
                    </>
                  )}
                />
              </XStack>
            </YStack>
            <Form.Trigger asChild>
              <Button marginTop="$4" icon={loading ? <Spinner /> : <Plus />}>
                Create Habit
              </Button>
            </Form.Trigger>
          </YStack>
        </Form>
      </YStack>
    </Screen>
  );
}
