import { createTRPCRouter } from "./trpc";
import { habitRouter } from "./routers/habit";

export const router = createTRPCRouter({
  habit: habitRouter,
});

export type Router = typeof router;
