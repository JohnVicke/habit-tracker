import { router } from "expo-router";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Spinner, View } from "tamagui";
import { z } from "zod";

import { graphql } from "@ht/api/client";

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

export const SignIn = () => {
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
      router.push("/(main)/");
    },
  });

  return (
    <View>
      <Form
        onSubmit={handleSubmit((data) => {
          void mutate({ variables: data });
        })}
      >
        <Controller
          control={control}
          name="username"
          render={({ field }) => <Input {...field} placeholder="Username" />}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input {...field} secureTextEntry placeholder="Password" />
          )}
        />
        <Form.Trigger asChild>
          <Button icon={loading ? <Spinner /> : undefined}>Sign in</Button>
        </Form.Trigger>
      </Form>
    </View>
  );
};
