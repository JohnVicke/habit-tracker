import { LibsqlError } from "@ht/db";

import type { BaseContext } from "../../context";
import type { MutationResolvers } from "../../gql/generated";
import { HTError } from "../errors";

export const signUp: MutationResolvers<BaseContext>["signUp"] = async (
  _parent,
  args,
  { auth },
) => {
  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: args.username,
        password: args.password,
      },
      attributes: {
        username: args.username,
      },
    });

    const session = await auth.createSession({
      userId: user.id,
      attributes: {},
    });

    return {
      token: session.sessionId,
    };
  } catch (err) {
    if (err instanceof LibsqlError && err.code === "SQLITE_CONSTRAINT") {
      throw new HTError({ code: "USER_ALREADY_EXISTS" });
    }
    throw new HTError({ code: "INTERNAL_SERVER_ERROR" });
  }
};
