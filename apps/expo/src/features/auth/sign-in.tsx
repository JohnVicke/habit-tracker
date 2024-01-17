import { Text } from "react-native";
import { router } from "expo-router";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { graphql } from "@ht/api/client";

import { Screen } from "~/components/screen";
import { secureStore } from "~/utils/secure-store";
import { useSession } from "./use-session";

const signInMutation = graphql(/* GraphQL */ `
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`);

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

type FormValues = z.infer<typeof schema>;

export const SignIn = () => {
  const { setSession } = useSession();
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "testuser",
      password: "Tallasen1",
    },
  });

  const [mutate, { loading }] = useMutation(signInMutation, {
    async onCompleted(data) {
      await secureStore.setItem("session_token", data.signIn.token);
      setSession(data.signIn.token);
      router.push("/(main)/(tabs)/dashboard");
    },
  });

  return (
    <Screen>
      <Text>Sign in</Text>
    </Screen>
  );
};
