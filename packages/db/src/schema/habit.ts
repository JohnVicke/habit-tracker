import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { id, timestamps } from "../utils/sql";
import { user } from "./auth";

export const habit = sqliteTable("habit", {
  id,
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  description: text("name"),
  type: text("type", {
    enum: ["daily", "weekly", "monthly", "yearly"],
  }).notNull(),
  frequency: integer("frequency").notNull(),
  endDate: integer("end_date", { mode: "timestamp_ms" }),
  ...timestamps,
});

export const habitRelations = relations(habit, ({ one }) => ({
  user: one(user, {
    fields: [habit.userId],
    references: [user.id],
  }),
}));
