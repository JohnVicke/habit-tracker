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
import { SelectField } from "~/components/select-field";
import { TextField } from "~/components/text-field";

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
  name: z.string().min(1),
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
      name: "",
      frequency: 1,
      type: "WEEKLY",
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
            <TextField
              label="What do you want to achieve?"
              placeholder="Drink 3 liters of water..."
              control={control}
              name="name"
            />
            <YStack>
              <Label>Frequency</Label>
              <XStack space alignItems="center">
                <TextField
                  control={control}
                  name="frequency"
                  placeholder="1"
                  keyboardType="numeric"
                />
                <H3 opacity={0.3}>/</H3>
                <SelectField
                  width={150}
                  control={control}
                  name="type"
                  values={typeSelectItems}
                  groupLabel="Type"
                  displayValue={(value) => value.displayValue}
                  getValue={(value) => value.value}
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