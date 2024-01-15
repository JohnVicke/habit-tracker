import type { AuthenticatedContext } from "../../context";
import type { QueryResolvers } from "../../gql/generated";
import { habitEntityToGraphQL } from "../../dto/habit";

export const habits: QueryResolvers<AuthenticatedContext>["habits"] = async (
  _parent,
  _args,
  { db, user },
) => {
  const habits = await db.query.habit.findMany({
    where: (habit, { eq }) => eq(habit.userId, user.id),
    with: {
      habitEntries: true,
    },
  });

  return habits.map((habit) => habitEntityToGraphQL(habit, user.id));
};
