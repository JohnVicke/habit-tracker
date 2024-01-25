import { logger } from "../../logger";
import { t } from "../trpc";

export function createLoggingMiddleware() {
  return t.middleware(async ({ path, type, next }) => {
    const start = Date.now();
    const result = await next();
    const duration = Date.now() - start;

    result.ok
      ? logger.info({ path, type, duration })
      : logger.error({ path, type, duration });

    return result;
  });
}
