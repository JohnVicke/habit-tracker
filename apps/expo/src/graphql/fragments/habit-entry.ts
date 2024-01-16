import { graphql } from "@ht/api/client";

export const HabitEntryFragment = graphql(/* GraphQL */ `
  fragment HabitEntryFragment on HabitEntry {
    id
    day
    habitId
  }
`);
