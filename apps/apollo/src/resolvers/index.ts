import type { MutationResolvers, QueryResolvers } from "../gql/generated";
import { signUp } from "./mutations/sign-up";
import { dashboard } from "./queries/dashboard";

export const resolvers = {
  Query: { dashboard },
  Mutation: { signUp },
} satisfies { Query: QueryResolvers; Mutation: MutationResolvers };
