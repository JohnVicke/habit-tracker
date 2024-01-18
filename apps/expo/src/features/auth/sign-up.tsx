import { Text, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
      <View>
        <Text>hello world</Text>
      </View>
    </Screen>
  );
};
