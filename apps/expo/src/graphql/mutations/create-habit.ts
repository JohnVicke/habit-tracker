import { graphql } from "@ht/api/client";

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
    update(cache, { data }) {
      console.log({ data });
      console.log({ cache });
    },
  });
};
