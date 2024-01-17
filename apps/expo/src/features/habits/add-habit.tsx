import React from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { graphql } from "@ht/api/client";

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
  name: z.string().min(1),
  frequency: z.number(),
  type: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  description: z.string().optional(),
});

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
      <View>
        {!isPresented && <Link href="/(main)/(tabs)/dashboard">Go back</Link>}
      </View>
    </Screen>
  );
}
