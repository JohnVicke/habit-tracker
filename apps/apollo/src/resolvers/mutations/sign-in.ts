import type { BaseContext } from "../../context";
import type { MutationResolvers } from "../../gql/generated";

export const signIn: MutationResolvers<BaseContext>["signIn"] = async (
  _parent,
  args,
  { auth },
) => {
  const key = await auth.useKey("username", args.username, args.password);

  const session = await auth.createSession({
    userId: key.userId,
    attributes: {},
  });

  return {
    token: session.sessionId,
  };
};
