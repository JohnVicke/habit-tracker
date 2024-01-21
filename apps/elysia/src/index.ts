import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";

import { createContext, router } from "./trpc";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(trpc(router, { createContext, endpoint: "/v1/trpc" }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
