import type { InferInsertModel, InferSelectModel, schema } from "@ht/db";
import { createId } from "@ht/db";

import type { CreateHabitEntryInput } from "../gql/generated";

type HabitEntryInsertModel = InferInsertModel<typeof schema.habitEntry>;
type HabitEntryEntity = InferSelectModel<typeof schema.habitEntry>;

export function createHabitEntryInputToInsertModel(
  input: CreateHabitEntryInput,
): HabitEntryInsertModel {
  return {
    id: createId(),
    habitId: input.habitId,
    day: input.day,
  };
}

export function habitEntryEntityToGraphQL(
  habitEntry: HabitEntryEntity,
): HabitEntryEntity {
  return habitEntry;
}
