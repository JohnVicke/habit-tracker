import { createServer } from "./create-server";
import { logger } from "./logger";

logger.info("HABIT TRACKER API");
const server = createServer();

try {
  const { url } = await server.start({ port: 4000, path: "/graphql" });
  logger.info(`🚀 Server ready at ${url}`);
} catch (error) {
  logger.error("Unhandled error");
  logger.error(error);
  process.exit(1);
}
