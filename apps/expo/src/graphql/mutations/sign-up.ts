import { router } from "expo-router";

import { graphql } from "@ht/api/client";

import { secureStore } from "~/utils/secure-store";
import { useBetterMutation } from "./use-better-mutation";

const signUpMutation = graphql(/* GraphQL */ `
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
    }
  }
`);

export const useSignUpMutation = () => {
  return useBetterMutation(signUpMutation, {
    async onCompleted(data) {
      await secureStore.setItem("session_token", data.signUp.token);
      router.push("/(main)/(tabs)/dashboard");
    },
  });
};
