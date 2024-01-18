import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { id, timestamps } from "../utils/sql";
import { user } from "./auth";

export const habit = sqliteTable("habit", {
  id,
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("name"),
  type: text("type", {
    enum: ["daily", "weekly", "monthly", "yearly"],
  }).notNull(),
  frequency: integer("frequency").notNull(),
  endDate: integer("end_date", { mode: "timestamp_ms" }),
  ...timestamps,
});

export const habitEntry = sqliteTable("habit_entry", {
  id,
  habitId: text("habit_id")
    .notNull()
    .references(() => habit.id, { onDelete: "cascade" }),
  day: integer("day", { mode: "timestamp_ms" }).notNull(),
  ...timestamps,
});

export const habitRelations = relations(habit, ({ many, one }) => ({
  user: one(user, {
    fields: [habit.userId],
    references: [user.id],
  }),
  habitEntries: many(habitEntry),
}));

export const habtiEntryRelations = relations(habitEntry, ({ one }) => ({
  habit: one(habit, {
    fields: [habitEntry.habitId],
    references: [habit.id],
  }),
}));
