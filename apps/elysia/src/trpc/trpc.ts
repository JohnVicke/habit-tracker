import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";
import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/backend";
import { db } from "@ht/db";
import { clerkClient } from "../clerk";
import { logger } from "../logger";

type AuthContextProps = {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
};

const getAuth = async (opts: FetchCreateContextFnOptions) => {
  const start = Date.now();

  const requestState = await clerkClient.authenticateRequest({
    request: opts.req,
  });

  const duration = Date.now() - start;
  logger.info({ message: "Auth request finished", duration });

  return requestState.toAuth();
};

export const createContextInner = async ({ auth }: AuthContextProps) => {
  return { auth, db };
};

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  return createContextInner({ auth: await getAuth(opts) });
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create({ transformer: SuperJSON });

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx?.auth?.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const loggingMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const duration = Date.now() - start;

  result.ok
    ? logger.info({ path, type, duration })
    : logger.error({ path, type, duration });

  return result;
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(loggingMiddleware);
export const protectedProcedure = t.procedure
  .use(loggingMiddleware)
  .use(authMiddleware);
