import type { InferSelectModel, schema } from "@ht/db";
import { auth } from "@ht/auth";
import { db } from "@ht/db";

export interface BaseContext {
  db: typeof db;
  auth: typeof auth;
}

export interface AuthenticatedContext extends BaseContext {
  user: InferSelectModel<(typeof schema)["user"]>;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext(): Promise<Context> {
  const baseContext = {
    db,
    auth,
  } satisfies BaseContext;

  return baseContext;
}

export type Context = BaseContext | AuthenticatedContext;
