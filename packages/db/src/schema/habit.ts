import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { id, timestamps } from "../utils/sql";

export const habit = sqliteTable("habit", {
  id,
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("name"),
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
