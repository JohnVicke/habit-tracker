import { Text } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Screen } from "~/components/screen";
import { useSignInMutation } from "~/graphql/mutations/sign-in";

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

  const { mutate, loading } = useSignInMutation();

  return (
    <Screen>
      <Text>sign in </Text>
    </Screen>
  );
};
