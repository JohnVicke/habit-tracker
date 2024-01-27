import type { SignedInAuthObject, SignedOutAuthObject } from "@clerk/backend";

import { db } from "@ht/db";

import type { Context } from "~/trpc/trpc";
import { env } from "~/env";
import { router } from "~/trpc";
import { t } from "~/trpc/trpc";

export function testRequest(path: string, init?: RequestInit) {
  return new Request(`http://localhost:${env.PORT}${path}`, init);
}

export function createCaller(ctx: Context) {
  const createCaller = t.createCallerFactory(router);
  return createCaller({ ...ctx, db });
}

export const signedInAuthObject = {
  sessionClaims: {
    __raw: "encoded_token_here",
    iss: "issuer",
    sub: "subject",
    sid: "session_id",
    nbf: Date.now() / 1000,
    exp: Date.now() / 1000 + 3600,
    iat: Date.now() / 1000,
    azp: "authorized_party",
  },
  sessionId: "session-id",
  session: undefined,
  actor: undefined,
  userId: "1",
  user: undefined,
  orgId: undefined,
  orgRole: undefined,
  orgSlug: undefined,
  orgPermissions: undefined,
  organization: undefined,
  getToken: () => Promise.resolve("token"),
  has: () => true,
  debug: () => null,
} satisfies SignedInAuthObject;

export const signedOutAuthObject = {
  sessionClaims: null,
  sessionId: null,
  session: null,
  actor: null,
  userId: null,
  user: null,
  orgId: null,
  orgRole: null,
  orgSlug: null,
  orgPermissions: null,
  organization: null,
  getToken: () => Promise.resolve(""),
  has: () => false,
  debug: () => null,
} satisfies SignedOutAuthObject;
