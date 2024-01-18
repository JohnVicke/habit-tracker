import { graphql } from "@ht/api/client";

import { useBetterMutation } from "./use-better-mutation";

const deleteHabitMutation = graphql(/* GraphQL */ `
  mutation DeleteHabit($deleteHabitId: ID!) {
    deleteHabit(id: $deleteHabitId)
  }
`);

export const useDeleteHabitMutation = () => {
  return useBetterMutation(deleteHabitMutation);
};
