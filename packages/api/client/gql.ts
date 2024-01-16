/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment HabitEntryFragment on HabitEntry {\n    id\n    day\n    habitId\n  }\n": types.HabitEntryFragmentFragmentDoc,
    "\n  fragment HabitFragment on Habit {\n    id\n    userId\n    name\n    type\n    frequency\n    createdAt\n    endDate\n    description\n    entries {\n      ...HabitEntryFragment\n    }\n  }\n": types.HabitFragmentFragmentDoc,
    "\n  mutation CreateHabitEntry($input: CreateHabitEntryInput!) {\n    createHabitEntry(input: $input) {\n      ...HabitEntryFragment\n    }\n  }\n": types.CreateHabitEntryDocument,
    "\n  mutation CreateHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      ...HabitFragment\n    }\n  }\n": types.CreateHabitDocument,
    "\n  mutation SignIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password) {\n      token\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp($username: String!, $password: String!) {\n    signUp(username: $username, password: $password) {\n      token\n    }\n  }\n": types.SignUpDocument,
    "\n  query HabitsQuery {\n    habits {\n      ...HabitFragment\n    }\n  }\n": types.HabitsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment HabitEntryFragment on HabitEntry {\n    id\n    day\n    habitId\n  }\n"): (typeof documents)["\n  fragment HabitEntryFragment on HabitEntry {\n    id\n    day\n    habitId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment HabitFragment on Habit {\n    id\n    userId\n    name\n    type\n    frequency\n    createdAt\n    endDate\n    description\n    entries {\n      ...HabitEntryFragment\n    }\n  }\n"): (typeof documents)["\n  fragment HabitFragment on Habit {\n    id\n    userId\n    name\n    type\n    frequency\n    createdAt\n    endDate\n    description\n    entries {\n      ...HabitEntryFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateHabitEntry($input: CreateHabitEntryInput!) {\n    createHabitEntry(input: $input) {\n      ...HabitEntryFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateHabitEntry($input: CreateHabitEntryInput!) {\n    createHabitEntry(input: $input) {\n      ...HabitEntryFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      ...HabitFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      ...HabitFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp($username: String!, $password: String!) {\n    signUp(username: $username, password: $password) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($username: String!, $password: String!) {\n    signUp(username: $username, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HabitsQuery {\n    habits {\n      ...HabitFragment\n    }\n  }\n"): (typeof documents)["\n  query HabitsQuery {\n    habits {\n      ...HabitFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;