import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

export function createAuthMiddleware() {
  return t.middleware(({ ctx, next }) => {
    if (!ctx?.auth?.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });
    }
    return next({
      ctx: {
        auth: ctx.auth,
      },
    });
  });
}
