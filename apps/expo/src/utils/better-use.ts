import type { TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const useBetterMutation = <TResult, TVariables>(
  mutation: TypedDocumentNode<TResult, TVariables>,
) => {
  const [mutate, results] = useMutation(mutation);
  return { mutate, results };
};
