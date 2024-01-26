import { env } from "~/env";

export function testRequest(path: string, init?: RequestInit) {
  return new Request(`http://localhost:${env.PORT}${path}`, init);
}
