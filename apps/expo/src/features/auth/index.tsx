import type { ImageURISource } from "react-native";
import { View } from "react-native";
import { useAssets } from "expo-asset";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { MotiImage, MotiView } from "moti";

import { Screen } from "~/components/screen";
import { Typography } from "~/components/typography";
import { SignIn } from "./sign-in";

export function Auth() {
  const [assets] = useAssets([require("../../../assets/vana.png")]);
  const auth = useAuth();

  if (!auth.isLoaded) {
    return <Typography>Loading...</Typography>;
  }

  if (auth.isSignedIn) {
    return <Redirect href="/(main)/(tabs)/dashboard" />;
  }

  return (
    <Screen>
      {assets?.[0] ? (
        <MotiImage
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={{
            marginTop: "20%",
            resizeMode: "center",
            height: 300,
            width: 300,
            alignSelf: "center",
          }}
          source={assets[0] as ImageURISource}
        />
      ) : (
        <View style={{ width: 300, height: 300 }} />
      )}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", delay: 500 }}
        className="justify-between"
      >
        <View className="gap-y-4">
          <SignIn />
        </View>
      </MotiView>
    </Screen>
  );
}
