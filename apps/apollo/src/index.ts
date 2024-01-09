import { createServer } from "./create-server";

const server = createServer();

try {
  const { url } = await server.start({ port: 4000, path: "/graphql" });
  console.log(`🚀 Server ready at ${url}`);
} catch (error) {
  console.error("Unhandled error");
  console.error(error);
  process.exit(1);
}

