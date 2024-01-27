import { Clerk } from "@clerk/backend";

import { env } from "./env";

export const clerkClient = Clerk({
  secretKey: env.CLERK_SECRET_KEY,
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
});
