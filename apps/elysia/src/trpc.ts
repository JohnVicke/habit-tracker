import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";
import { z } from "zod";
import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/backend";
import { db } from "@ht/db";
import { clerkClient } from "./clerk";

type AuthContextProps = {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
};

const getAuth = async (opts: FetchCreateContextFnOptions) => {
  const requestState = await clerkClient.authenticateRequest({
    request: opts.req,
  });

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

export const router = t.router({
  mirror: t.procedure.input(z.string()).query(({ input }) => input),
});

export type Router = typeof router;
