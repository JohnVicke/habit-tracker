import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";

import { env } from "./env";
import { logger } from "./logger";
import { createContext, router } from "./trpc";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(trpc(router, { createContext, endpoint: "api/v1/trpc" }))
  .listen(env.PORT);

logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
logger.info(
  `🦊 Serving tRPC on ${app.server?.hostname}:${app.server?.port}/api/v1/trpc`,
);

export type { Router, RouterInputs, RouterOutputs } from "./trpc";
