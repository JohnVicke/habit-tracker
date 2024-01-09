import type { MutationResolvers, QueryResolvers } from "./gql/generated";
import { signUp } from "./mutations/sign-up";

export const resolvers = {
  Query: {},
  Mutations: { signUp },
} satisfies { Query: QueryResolvers; Mutations: MutationResolvers };
