import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

if (!process.env.DB_URL) {
  throw new Error("DB_URL is not set");
}

if (!process.env.DB_AUTH_TOKEN) {
  throw new Error("DB_AUTH_TOKEN is not set");
}

export default {
  schema: "./src/schema",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_URL,
    authToken: process.env.DB_AUTH_TOKEN,
  },
} satisfies Config;
