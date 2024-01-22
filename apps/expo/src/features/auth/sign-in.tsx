import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { OAuthStrategy } from "./oauth-button";
import { Button } from "~/components/button";
import { Screen } from "~/components/screen";
import { TextField } from "~/components/text-field";
import { Typography } from "~/components/typography";
import { useWarmUpBrowser } from "~/hooks/use-warmup-browser";
import { OAuthButton } from "./oauth-button";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

type FormValues = z.infer<typeof schema>;

const strategies = ["google", "apple"] satisfies OAuthStrategy[];

WebBrowser.maybeCompleteAuthSession();

export const SignIn = () => {
  useWarmUpBrowser();

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "testuser",
      password: "Tallasen1",
    },
  });

  return (
    <Screen>
      <Typography size="xxl" bold>
        Welcome back!
      </Typography>
      <View className="flex-1 justify-center gap-y-4">
        <TextField label="Username" control={control} name="username" />
        <TextField label="Password " control={control} name="password" />
        <View className="mt-4 gap-y-4">
          <Button
            onPress={handleSubmit((data) => {
              console.log(data);
            })}
          >
            Sign in
          </Button>
          {strategies.map((strategy) => (
            <OAuthButton key={`sign-in-${strategy}`} strategy={strategy} />
          ))}
        </View>
      </View>
    </Screen>
  );
};
