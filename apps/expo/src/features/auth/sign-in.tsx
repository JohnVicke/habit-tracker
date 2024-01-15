import { router } from "expo-router";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, H1, H3, Input, Label, Spinner, YStack } from "tamagui";
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
      <H1>Hi</H1>
      <H3>Welcome back</H3>
      <YStack space marginTop="$8">
        <Form
          onSubmit={handleSubmit((data) => {
            void mutate({ variables: data });
          })}
        >
          <YStack space>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <>
                  <Label>Username</Label>
                  <Input {...field} placeholder="johnvicke" />
                </>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <>
                  <Label>Password</Label>
                  <Input {...field} secureTextEntry placeholder="Password" />
                </>
              )}
            />
            <Form.Trigger asChild>
              <Button marginTop="$4" icon={loading ? <Spinner /> : undefined}>
                Sign in
              </Button>
            </Form.Trigger>
          </YStack>
        </Form>
      </YStack>
    </Screen>
  );
};
