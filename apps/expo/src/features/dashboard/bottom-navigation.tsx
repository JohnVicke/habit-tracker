import type { SharedValue } from "react-native-reanimated";
import React from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { MotiView } from "moti";

import { Typography } from "~/components/typography";
import { cn } from "~/utils/cn";

const WIDTH = Dimensions.get("window").width;

interface Screen {
  name: string;
}

interface BottomNavigationProps {
  screens: readonly Screen[];
  activeScreen: Screen;
  nextScreen: VoidFunction;
  prevScreen: VoidFunction;
}

export function BottomNavigation(props: BottomNavigationProps) {
  const position = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    position.value = withSpring(0);
    opacity.value = withSpring(1);
  }, [props.activeScreen, opacity, position]);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      position.value = e.translationX;
      const distFromCenter = Math.abs(e.translationX);
      opacity.value = Math.max(0, 1 - (distFromCenter / 200) * 2);
    })
    .onFinalize((e) => {
      const distance = Math.abs(e.translationX);

      if (distance < 100) {
        position.value = withSpring(0, { duration: 500 });
        opacity.value = withSpring(1, { duration: 500 });
        return;
      }

      opacity.value = 0;

      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      if (e.translationX > 0) {
        position.value = -WIDTH / 2;
        props.nextScreen();
      } else {
        position.value = WIDTH / 2;
        props.prevScreen();
      }
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={pan}>
      <View className="h-20 w-full items-center justify-center gap-y-4">
        <View className="self-center">
          <TestContent position={position} opacity={opacity}>
            <Typography size="lg" bold>
              {props.activeScreen.name}
            </Typography>
          </TestContent>
        </View>
        <View className="flex-row gap-x-2">
          {props.screens.map((route) => (
            <MotiView
              animate={{
                opacity: props.activeScreen.name === route.name ? 1 : 0.2,
              }}
              transition={{ type: "timing" }}
              key={route.name}
              className={cn("h-2 w-2 rounded-full bg-slate-600")}
            />
          ))}
        </View>
      </View>
    </GestureDetector>
  );
}

interface TestContentProps {
  position: SharedValue<number>;
  opacity: SharedValue<number>;
}

function TestContent(props: React.PropsWithChildren<TestContentProps>) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: props.opacity.value,
    transform: [{ translateX: props.position.value }],
  }));

  return (
    <Animated.View style={[animatedStyle]}>{props.children}</Animated.View>
  );
}
