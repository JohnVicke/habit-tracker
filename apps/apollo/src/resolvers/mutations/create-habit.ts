import { GraphQLError } from "graphql";

import { schema } from "@ht/db";

import type { AuthenticatedContext } from "../../context";
import type { MutationResolvers } from "../../gql/generated";
import {
  createHabitInputToInsertModel,
  habitEntityToGraphQL,
} from "../../dto/habit";

export const createHabit: MutationResolvers<AuthenticatedContext>["createHabit"] =
  async (_parent, args, { db, user }) => {
    const inserted = await db
      .insert(schema.habit)
      .values(createHabitInputToInsertModel(args.input, user.id))
      .returning();

    console.log(inserted);

    const entity = inserted.at(0);

    if (!entity) {
      throw new GraphQLError("Failed to insert habit");
    }

    return habitEntityToGraphQL(entity, user.id);
  };
