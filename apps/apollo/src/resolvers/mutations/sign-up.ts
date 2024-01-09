import type { BaseContext } from "../../context";
import type { MutationResolvers } from "../../gql/generated";

export const signUp: MutationResolvers<BaseContext>["signUp"] = async (
  _parent,
  args,
  { auth },
) => {
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
};
