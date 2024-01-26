import { describe, expect, it } from "bun:test";

import { createServer } from "~/server";
import { testRequest } from "./test-utils";

describe("createServer", () => {
  it("healthcheck works", async () => {
    const app = createServer();
    const response = await app.handle(testRequest("/api/v1/health"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
  });
});
