import { router } from "expo-router";

import { graphql } from "@ht/api/client";

import { habitsQuery } from "../queries/habits";
import { useBetterMutation } from "./use-better-mutation";

const createHabitMutation = graphql(/* GraphQL */ `
  mutation CreateHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
      ...HabitFragment
    }
  }
`);

export const useCreateHabitMutation = () => {
  return useBetterMutation(createHabitMutation, {
    refetchQueries: [habitsQuery],
    onCompleted(_data) {
      router.push("/(main)/(tabs)/dashboard");
    },
  });
};
