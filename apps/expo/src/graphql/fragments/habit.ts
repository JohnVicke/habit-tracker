import { graphql } from "@ht/api/client";

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
