import { schema, createId, eq } from "@ht/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const habitEntryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ habitId: z.string(), day: z.date() }))
    .mutation(async ({ input, ctx: { db } }) => {
      const habit = {
        id: createId(),
        habitId: input.habitId,
        day: input.day,
      };

      try {
        await db.insert(schema.habitEntry).values({
          id: createId(),
          habitId: input.habitId,
          day: input.day,
        });
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return habit;
    }),
  allById: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
      }),
    )
    .query(({ input, ctx: { db } }) => {
      return db.query.habitEntry.findMany({
        where: (habitEntries, { eq }) =>
          eq(habitEntries.habitId, input.habitId),
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx: { db } }) => {
      return db
        .delete(schema.habitEntry)
        .where(eq(schema.habitEntry.id, input.id))
        .returning({ id: schema.habitEntry.id });
    }),
});
