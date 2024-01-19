import { eq, schema } from "@ht/db";

import type { AuthenticatedContext } from "../../context";
import type { MutationResolvers } from "../../gql/generated";
import { HTError } from "../errors";

export const deleteHabit: MutationResolvers<AuthenticatedContext>["deleteHabit"] =
  async (_parent, args, { db }) => {
    const res = await db
      .delete(schema.habit)
      .where(eq(schema.habit.id, args.id))
      .returning({ deletedId: schema.habit.id });

    const removedId = res.at(0)?.deletedId;

    if (!removedId) {
      throw new HTError({ code: "INTERNAL_SERVER_ERROR" });
    }

    return removedId;
  };