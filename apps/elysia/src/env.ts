import { z } from "zod";

const dbSchema = z.discriminatedUnion("DB_CONNECTION_TYPE", [
  z.object({
    DB_CONNECTION_TYPE: z.literal("local"),
    DB_URL: z.string().url(),
  }),
  z.object({
    DB_CONNECTION_TYPE: z.literal("local-replica"),
    DB_AUTH_TOKEN: z.string().min(1),
    DB_URL: z.string().url(),
  }),
  z.object({
    DB_CONNECTION_TYPE: z.literal("remote"),
    DB_AUTH_TOKEN: z.string().min(1),
    DB_URL: z.string().url(),
  }),
]);

const envSchema = z
  .object({
    PORT: z.number().int().default(3000),
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_PUBLISHABLE_KEY: z.string().min(1),
  })
  .and(dbSchema);

const parseResult = await envSchema.safeParseAsync(process.env);

if (!parseResult.success) {
  throw new Error(parseResult.error.message);
}

export const env = parseResult.data;
