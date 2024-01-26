import { env } from "./env";
import { logger } from "./logger";
import { createServer } from "./server";

const { server } = createServer().listen(env.PORT);

logger.info(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`);
logger.info(
  `🦊 Serving tRPC on ${server?.hostname}:${server?.port}/api/v1/trpc`,
);

export type { Router, RouterInputs, RouterOutputs } from "./trpc";
