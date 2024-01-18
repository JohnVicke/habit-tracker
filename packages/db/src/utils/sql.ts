import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export { createId } from "@paralleldrive/cuid2";

export const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
};

export const id = text("id").primaryKey().notNull();
