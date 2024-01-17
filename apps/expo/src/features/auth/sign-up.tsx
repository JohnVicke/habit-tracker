import { Text } from "react-native";
import { router } from "expo-router";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { graphql } from "@ht/api/client";

import { Screen } from "~/components/screen";
import { secureStore } from "~/utils/secure-store";

const signUpMutation = graphql(/* GraphQL */ `
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
    }
  }
`);

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

type FormValues = z.infer<typeof schema>;

export const SignUp = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "testuser",
      password: "Tallasen1",
    },
  });

  const [mutate, { loading }] = useMutation(signUpMutation, {
    async onCompleted(data) {
      await secureStore.setItem("session_token", data.signUp.token);
      router.push("/(main)/(tabs)/dashboard");
    },
  });

  return (
    <Screen>
      <Text>Sign in</Text>
    </Screen>
  );
};
