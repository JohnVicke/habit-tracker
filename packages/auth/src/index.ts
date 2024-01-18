import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { node } from "lucia/middleware";

import { client } from "@ht/db";

export const auth = lucia({
  adapter: libsql(client, {
    user: "user",
    session: "user_session",
    key: "user_key",
  }),
  env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: node(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => ({
    id: data.id,
    username: data.username,
  }),
});

export type Auth = typeof auth;
export type { Session } from "lucia";

export { LuciaError } from "lucia";
