import type { LucideIcon } from "lucide-react-native";
import React from "react";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { MotiView, View } from "moti";
import { MotiPressable, useMotiPressable } from "moti/interactions";

import { Screen } from "~/components/screen";
import { Typography } from "~/components/typography";

export interface OnboardingScreenProps {
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
  props: React.PropsWithChildren<{ onPress: VoidFunction }>,
) {
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
      <View className="flex-row items-center rounded px-4 py-2">
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
      <View className="top-1/3 flex-1">
        <View className="w-full justify-start gap-y-4">
          {props.children}
          <View className="justify-self-start">
            <ContinueButton onPress={props.nextScreen} />
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
