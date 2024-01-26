import { cors } from "@elysiajs/cors";
import { cron } from "@elysiajs/cron";
import swagger from "@elysiajs/swagger";
import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";

import { client } from "@ht/db";

import { env } from "./env";
import { logger } from "./logger";
import { createContext, router } from "./trpc";

export const createServer = () =>
  new Elysia()
    .use(cors())
    .use(swagger())
    .get("/api/v1/health", () => ({ status: "ok" }))
    .use(
      cron({
        name: "heartbeat",
        pattern: "*/2 * * * *",
        async run() {
          if (env.DB_CONNECTION_TYPE !== "local-replica") {
            return;
          }
          try {
            await client.sync();
            logger.info("Database synced");
          } catch (error) {
            logger.error("Failed to sync database", { error });
          }
        },
      }),
    )
    .use(trpc(router, { createContext, endpoint: "api/v1/trpc" }));
