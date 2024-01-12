import type { MutationResolvers, QueryResolvers } from "../gql/generated";
import { createHabit } from "./mutations/create-habit";
import { signIn } from "./mutations/sign-in";
import { signUp } from "./mutations/sign-up";
import { dashboard } from "./queries/dashboard";

export const resolvers = {
  Query: { dashboard },
  Mutation: { signUp, signIn, createHabit },
} satisfies { Query: QueryResolvers; Mutation: MutationResolvers };
