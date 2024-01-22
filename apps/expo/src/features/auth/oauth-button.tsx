import { useOAuth } from "@clerk/clerk-expo";

import { Button } from "~/components/button";

export type OAuthStrategy = "google" | "apple";

interface OAuthButtonProps {
  strategy: OAuthStrategy;
}

export function OAuthButton(props: OAuthButtonProps) {
  const { startOAuthFlow } = useOAuth({ strategy: `oauth_${props.strategy}` });

  return (
    <Button
      onPress={async () => {
        try {
          const { createdSessionId, setActive } = await startOAuthFlow();

          if (createdSessionId && setActive) {
            void setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
          console.error(JSON.stringify(err, null, 2));
        }
      }}
    >
      {props.strategy}
    </Button>
  );
}
