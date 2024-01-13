import type { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone";

import type { InferSelectModel, schema } from "@ht/db";
import { auth } from "@ht/auth";
import { db } from "@ht/db";

import { HTError } from "./resolvers/errors";

export interface BaseContext {
  db: typeof db;
  auth: typeof auth;
}

export interface AuthenticatedContext extends BaseContext {
  user: InferSelectModel<(typeof schema)["user"]>;
}

const nonAuthRoutesOperations = ["SignIn", "SignUp", "IntrospectionQuery"];

export async function createContext(
  args: StandaloneServerContextFunctionArgument,
): Promise<Context> {
  const baseContext = {
    db,
    auth,
  } satisfies BaseContext;

  const operationName = (args.req as any).body.operationName as string;

  if (nonAuthRoutesOperations.includes(operationName)) {
    return baseContext;
  }

  const authContext = auth.handleRequest(args.req, args.res);
  const session = await authContext.validateBearerToken();

  if (!session) {
    throw new HTError({ code: "UNAUTHENTICATED" });
  }

  return {
    ...baseContext,
    user: {
      id: session.user.id,
      username: session.user.username,
    },
  } satisfies AuthenticatedContext;
}

export type Context = BaseContext | AuthenticatedContext;
