import { schema, createId } from "@ht/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const habitRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(({ input, ctx: { db, auth } }) => {
      const habit = db.insert(schema.habit).values({
        id: createId(),
        name: input.name,
        userId: auth.userId,
      });
      return habit;
    }),
  all: protectedProcedure.query(({ ctx: { db, auth } }) => {
    return db.query.habit.findMany({
      where: (habits, { eq }) => eq(habits.userId, auth.userId),
    });
  }),
});
