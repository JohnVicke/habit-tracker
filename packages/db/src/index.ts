import type { Config } from "@libsql/client";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import type { Env } from "./env";
import { env } from "./env";
import * as schema from "./schema";

export * from "drizzle-orm";
export * as schema from "./schema";

const options = {
  local: {
    url: "file:local.sqlite",
  },
  "local-replica": {
    url: "file:local.sqlite",
    authToken: env.DB_AUTH_TOKEN,
    syncUrl: env.DB_URL,
  },
  remote: { authToken: env.DB_AUTH_TOKEN, url: env.DB_URL },
} satisfies Record<Env["DB_CONNECTION_TYPE"][number], Config>;

export const client = createClient(options[env.DB_CONNECTION_TYPE]);

if (env.DB_CONNECTION_TYPE === "local-replica") {
  await client.sync();
}

export const db = drizzle(client, { schema });
export { LibsqlError } from "@libsql/client";
export { createId } from "./utils/sql";
