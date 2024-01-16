import type { MutationHookOptions, TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const useBetterMutation = <TResult, TVariables>(
  mutation: TypedDocumentNode<TResult, TVariables>,
  options?: MutationHookOptions<TResult, TVariables>,
) => {
  const [mutate, results] = useMutation(mutation, options);
  return { mutate, ...results };
};
