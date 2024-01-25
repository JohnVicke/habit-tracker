import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";
import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/backend";
import { db } from "@ht/db";
import { clerkClient } from "../clerk";
import { createAuthMiddleware } from "./middlewares/auth";
import { createLoggingMiddleware } from "./middlewares/logging";
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

export const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create({ transformer: SuperJSON });

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(createLoggingMiddleware());
export const protectedProcedure = t.procedure
  .use(createLoggingMiddleware())
  .use(createAuthMiddleware());
