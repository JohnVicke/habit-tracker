import { useQuery } from "@apollo/client";

import { graphql } from "@ht/api/client";

export const habitsQuery = graphql(/* GraphQL */ `
  query HabitsQuery {
    habits {
      ...HabitFragment
    }
  }
`);

export const useHabitsQuery = () => {
  return useQuery(habitsQuery);
};