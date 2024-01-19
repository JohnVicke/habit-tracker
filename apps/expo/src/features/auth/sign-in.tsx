import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/button";
import { Screen } from "~/components/screen";
import { TextField } from "~/components/text-field";
import { Typography } from "~/components/typography";
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
      <Typography size="xxl" bold>
        Welcome back!
      </Typography>
      <View className="flex-1 justify-center gap-y-4">
        <TextField label="Username" control={control} name="username" />
        <TextField label="Password " control={control} name="password" />
        <View className="mt-4">
          <Button
            onPress={handleSubmit((data) => {
              void mutate({ variables: data });
            })}
          >
            Sign in
          </Button>
        </View>
      </View>
    </Screen>
  );
};
