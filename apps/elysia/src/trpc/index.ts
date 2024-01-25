import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { Router } from "./root";

export type { Router } from "./root";
export { router } from "./root";
export { createContext, createTRPCRouter } from "./trpc";

export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
