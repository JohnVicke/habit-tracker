import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { node } from "lucia/middleware";

import { client, schema } from "@ht/db";

export const auth = lucia({
  adapter: libsql(client, {
    user: schema.user._.name,
    session: schema.session._.name,
    key: schema.key._.name,
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
