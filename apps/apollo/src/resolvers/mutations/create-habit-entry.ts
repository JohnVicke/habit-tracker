import { GraphQLError } from "graphql";

import { schema } from "@ht/db";

import type { AuthenticatedContext } from "../../context";
import type { MutationResolvers } from "../../gql/generated";
import {
  createHabitEntryInputToInsertModel,
  habitEntryEntityToGraphQL,
} from "../../dto/habit-entry";

export const createHabitEntry: MutationResolvers<AuthenticatedContext>["createHabitEntry"] =
  async (_parent, args, { db }) => {
    const inserted = await db
      .insert(schema.habitEntry)
      .values(createHabitEntryInputToInsertModel(args.input))
      .returning()
      .catch(console.error);

    const entity = inserted?.at(0);

    if (!entity) {
      throw new GraphQLError("Failed to insert habit");
    }

    return habitEntryEntityToGraphQL(entity);
  };
