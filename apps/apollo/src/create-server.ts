import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DateTimeResolver } from "graphql-scalars";

import type { Context } from "./context";
import { createContext } from "./context";
import { createApolloLogger } from "./logger/apollo-logger";
import { resolvers } from "./resolvers";
import { typeDefs } from "./type-defs";

export function createServer() {
  const apollo = new ApolloServer<Context>({
    typeDefs: typeDefs,
    resolvers: { ...resolvers, Date: DateTimeResolver },
    plugins: [createApolloLogger()],
  });
  return {
    async start(listenOptions: { port: number; path: string }) {
      const { url } = await startStandaloneServer(apollo, {
        context: createContext,
        listen: listenOptions,
      });
      return { url };
    },
    instance: apollo,
  };
}