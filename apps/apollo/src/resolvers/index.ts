import type { MutationResolvers, QueryResolvers } from "../gql/generated";
import { createHabit } from "./mutations/create-habit";
import { createHabitEntry } from "./mutations/create-habit-entry";
import { deleteHabitEntry } from "./mutations/delete-habit-entry";
import { signIn } from "./mutations/sign-in";
import { signOut } from "./mutations/sign-out";
import { signUp } from "./mutations/sign-up";
import { dashboard } from "./queries/dashboard";
import { habits } from "./queries/habits";

export const resolvers = {
  Query: { dashboard, habits },
  Mutation: {
    signUp,
    signOut,
    signIn,
    createHabit,
    createHabitEntry,
    deleteHabitEntry,
  },
} satisfies { Query: QueryResolvers; Mutation: MutationResolvers };
