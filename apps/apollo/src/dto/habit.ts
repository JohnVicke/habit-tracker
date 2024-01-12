import type { InferInsertModel, InferSelectModel, schema } from "@ht/db";

import type { CreateHabitInput, Habit } from "../gql/generated";

type HabitInsertModel = InferInsertModel<typeof schema.habit>;
type HabitEntity = InferSelectModel<typeof schema.habit>;

const habitTypeMappings = {
  toEntity: {
    DAILY: "daily",
    MONTHLY: "monthly",
    WEEKLY: "weekly",
    YEARLY: "yearly",
  } satisfies Record<Habit["type"], HabitEntity["type"]>,
  toGraphql: {
    daily: "DAILY",
    monthly: "MONTHLY",
    weekly: "WEEKLY",
    yearly: "YEARLY",
  } satisfies Record<HabitEntity["type"], Habit["type"]>,
};

export function createHabitInputToInsertModel(
  input: CreateHabitInput,
  userId: string,
): HabitInsertModel {
  return {
    userId: userId,
    description: input.description,
    name: input.name,
    frequency: input.frequency,
    type: habitTypeMappings.toEntity[input.type] as HabitEntity["type"],
    endDate: input.endDate ? new Date(input.endDate) : undefined,
  };
}

export function habitEntityToGraphQL(
  habit: HabitEntity,
  userId: string,
): Habit {
  return {
    userId,
    id: habit.id,
    name: habit.name,
    description: habit.description,
    frequency: habit.frequency,
    type: habitTypeMappings.toGraphql[habit.type],
    endDate: habit.endDate?.toISOString(),
    createdAt: habit.createdAt.toISOString(),
  };
}
