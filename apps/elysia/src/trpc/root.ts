import { habitRouter } from "./routers/habit";
import { createTRPCRouter } from "./trpc";

export const router = createTRPCRouter({
  habit: habitRouter,
});

export type Router = typeof router;
