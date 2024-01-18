import type { AuthenticatedContext } from "../../context";
import type { MutationResolvers } from "../../gql/generated";

export const signOut: MutationResolvers<AuthenticatedContext>["signOut"] =
  async (_parent, _args, { auth, session }) => {
    try {
      await auth.invalidateSession(session.sessionId);
      return true;
    } catch (error) {
      return false;
    }
  };
