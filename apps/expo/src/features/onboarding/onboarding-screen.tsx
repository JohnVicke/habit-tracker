import React from "react";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { MotiView, View } from "moti";
import { MotiPressable, useMotiPressable } from "moti/interactions";

import type { OnboardingScreenName } from "./use-onboarding";
import { Screen } from "~/components/screen";
import { Typography } from "~/components/typography";
import { useOnboardingMutation } from "./use-onboarding";

export interface OnboardingScreenProps {
  screen: OnboardingScreenName;
  nextScreen: VoidFunction;
  previousScreen?: VoidFunction;
}

function Title(props: React.PropsWithChildren) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -20 }}
      transition={{ type: "spring" }}
    >
      <Typography size="xxl" bold>
        {props.children}
      </Typography>
    </MotiView>
  );
}

function Description(props: React.PropsWithChildren) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -20 }}
      transition={{ type: "spring", delay: 250 }}
    >
      <Typography size="xl">{props.children}</Typography>
    </MotiView>
  );
}

function SkipAllButton() {
  function skipAll() {
    router.push("/(auth)/auth");
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -20 }}
      transition={{ type: "spring", delay: 750 }}
    >
      <MotiPressable onPress={skipAll}>
        <Typography>Skip all</Typography>
      </MotiPressable>
    </MotiView>
  );
}

function ContinueButton(
  props: React.PropsWithChildren<{
    onPress: VoidFunction;
    screen: OnboardingScreenName;
  }>,
) {
  const { mutate } = useOnboardingMutation();
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -20 }}
      transition={{ type: "spring", delay: 500 }}
    >
      <MotiPressable
        onPress={() => {
          props.onPress();
          void mutate(props.screen);
          void Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success,
          );
        }}
        style={{ alignItems: "center", marginTop: 16 }}
      >
        <ContinueButtonInner />
      </MotiPressable>
    </MotiView>
  );
}

function ContinueButtonInner() {
  const arrowState = useMotiPressable(({ pressed }) => {
    "worklet";

    return {
      translateX: pressed ? 20 : 0,
    };
  });

  const textState = useMotiPressable(({ pressed }) => {
    "worklet";

    return {
      scale: pressed ? 0.95 : 1,
    };
  });

  return (
    <MotiView>
      <View className="flex-row items-end rounded px-4 py-2">
        <MotiView state={textState}>
          <Typography size="xl">continue</Typography>
        </MotiView>
        <MotiView state={arrowState}>
          <ArrowRight className="ml-2 text-slate-800" />
        </MotiView>
      </View>
    </MotiView>
  );
}

export function OnboardingScreen(
  props: React.PropsWithChildren<OnboardingScreenProps>,
) {
  return (
    <Screen>
      <View className="top-1/4 flex-1">
        <View className="w-full justify-start gap-y-4">
          {props.children}
          <View className="self-start">
            <ContinueButton screen={props.screen} onPress={props.nextScreen} />
          </View>
        </View>
      </View>
      <View className="items-center pb-4">
        <SkipAllButton />
      </View>
    </Screen>
  );
}

OnboardingScreen.Title = Title;
OnboardingScreen.Description = Description;
