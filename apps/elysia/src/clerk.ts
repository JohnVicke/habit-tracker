import { Clerk } from "@clerk/backend";

export const clerkClient = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
  apiUrl: process.env.CLERK_API_URL ?? "https://api.clerk.dev",
  apiVersion: process.env.API_VERSION ?? "v1",
  jwtKey: process.env.CLERK_JWT_KEY,
});
