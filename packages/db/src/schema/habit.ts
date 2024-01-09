import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const habit = sqliteTable("habit", {
  id: text("id").primaryKey(),
});
