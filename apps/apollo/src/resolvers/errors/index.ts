import { GraphQLError } from "graphql";

import type { GraphqlErrorCode } from "./codes";

export class UsernameExistsError extends GraphQLError {
  constructor(name: string) {
    super(`${name} already exists`, {
      extensions: { code: "USERNAME_EXISTS" },
    });
  }
}

export class InternalServerError extends GraphQLError {
  constructor() {
    super("Internal server error", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
}

export class HTError extends GraphQLError {
  constructor(opts: { message?: string; code: GraphqlErrorCode }) {
    super(opts.message ?? opts.code, {
      extensions: {
        code: opts.code,
      },
    });
  }
}
