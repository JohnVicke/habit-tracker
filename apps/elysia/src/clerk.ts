import { Clerk } from "@clerk/backend";

export const clerkClient = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});
