import { graphql } from "@ht/api/client";

import { useBetterMutation } from "./use-better-mutation";

const createHabitEntryMutation = graphql(/* GraphQL */ `
  mutation CreateHabitEntry($input: CreateHabitEntryInput!) {
    createHabitEntry(input: $input) {
      ...HabitEntryFragment
    }
  }
`);

export const useCreateHabitEntryMutation = () => {
  return useBetterMutation(createHabitEntryMutation);
};
