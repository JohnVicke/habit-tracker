import { router } from "expo-router";

import { graphql } from "@ht/api/client";

import { useSession } from "~/features/auth/use-session";
import { secureStore } from "~/utils/secure-store";
import { useBetterMutation } from "./use-better-mutation";

const signInMutation = graphql(/* GraphQL */ `
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`);

export const useSignInMutation = () => {
  const { setSession } = useSession();
  return useBetterMutation(signInMutation, {
    async onCompleted(data) {
      await secureStore.setItem("session_token", data.signIn.token);
      setSession(data.signIn.token);
      router.push("/(main)/(tabs)/dashboard");
    },
  });
};
