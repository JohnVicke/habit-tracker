import type { BaseContext } from "../../context";
import type { QueryResolvers } from "../../gql/generated";

export const dashboard: QueryResolvers<BaseContext>["dashboard"] = () => {
  return {
    totalHabits: 1,
    longestStreak: 1,
    completedHabits: 2,
  };
};
