import { useQuery } from "@apollo/client";

import { graphql } from "@ht/api/client";

import { useBetterMutation } from "~/utils/better-use";

export const HabitEntryFragment = graphql(/* GraphQL */ `
  fragment HabitEntryFragment on HabitEntry {
    id
    day
    habitId
  }
`);

export const HabitFragment = graphql(/* GraphQL */ `
  fragment HabitFragment on Habit {
    id
    userId
    name
    type
    frequency
    createdAt
    endDate
    description
    entries {
      ...HabitEntryFragment
    }
  }
`);

export const habitsQuery = graphql(/* GraphQL */ `
  query HabitsQuery {
    habits {
      ...HabitFragment
    }
  }
`);

const createHabitEntryMutation = graphql(/* GraphQL */ `
  mutation CreateHabitEntry($input: CreateHabitEntryInput!) {
    createHabitEntry(input: $input) {
      ...HabitEntryFragment
    }
  }
`);

export const useHabitsQuery = () => {
  return useQuery(habitsQuery);
};

export const useCreateHabitEntryMutation = () => {
  return useBetterMutation(createHabitEntryMutation);
};
