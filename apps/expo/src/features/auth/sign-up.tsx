import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, H1, Input, Spinner, YStack } from "tamagui";
import { z } from "zod";

import { Screen } from "~/components/screen";
import { useSignUpMutation } from "~/graphql/mutations/sign-up";

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

  const { mutate, loading } = useSignUpMutation();

  return (
    <Screen>
      <YStack space>
        <H1>Sign Up</H1>
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
                <Input {...field} placeholder="Username" />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input {...field} secureTextEntry placeholder="Password" />
              )}
            />
            <Form.Trigger asChild>
              <Button theme="purple" icon={loading ? <Spinner /> : undefined}>
                Sign ink
              </Button>
            </Form.Trigger>
          </YStack>
        </Form>
      </YStack>
    </Screen>
  );
};
