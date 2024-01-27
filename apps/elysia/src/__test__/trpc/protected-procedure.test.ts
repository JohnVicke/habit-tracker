import { describe, expect, it } from "bun:test";

import { createContextInner } from "~/trpc/trpc";
import {
  createCaller,
  signedInAuthObject,
  signedOutAuthObject,
} from "../test-utils";

describe("protectedProcedure", () => {
  it("should throw an error if auth is null", () => {
    const ctx = createContextInner({ auth: null });
    const caller = createCaller(ctx);
    expect(async () => await caller.habit.all()).toThrow("Not authenticated");
  });
  it("should throw an error if auth is SignedOutAuthObject", () => {
    const ctx = createContextInner({ auth: signedOutAuthObject });
    const caller = createCaller(ctx);
    expect(async () => await caller.habit.all()).toThrow("Not authenticated");
  });
  it("should not throw if auth is SignedInAuthObject", () => {
    const ctx = createContextInner({ auth: signedInAuthObject });
    const caller = createCaller(ctx);
    expect(async () => await caller.habit.all()).not.toThrow(
      "Not authenticated",
    );
  });
});
