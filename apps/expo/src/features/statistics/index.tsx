import React from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { H1, H2, YStack } from "tamagui";

import { Screen } from "~/components/screen";
import { WeeklyProgress } from "./weekly-progress";

export function Statistics() {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!headerHeight) {
      return {};
    }
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75],
          ),
        },
      ],
    };
  });

  return (
    <Screen>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <View className="min-h-screen">
          <Animated.View
            onLayout={(event) => {
              if (!headerHeight) {
                setHeaderHeight(event.nativeEvent.layout.height);
              }
            }}
            style={headerAnimatedStyle}
          >
            <H1>Last month</H1>
          </Animated.View>
          <YStack space>
            <DashboardSection>
              <DashboardSection.Title>Insights</DashboardSection.Title>
              <WeeklyProgress />
            </DashboardSection>
            <DashboardSection>
              <DashboardSection.Title>Insights</DashboardSection.Title>
              <WeeklyProgress />
            </DashboardSection>
          </YStack>
        </View>
      </Animated.ScrollView>
    </Screen>
  );
}

function DashboardSection(props: React.PropsWithChildren) {
  return <YStack space="$2">{props.children}</YStack>;
}

function DashboardSectionTitle(props: React.PropsWithChildren) {
  return <H2>{props.children}</H2>;
}

DashboardSection.Title = DashboardSectionTitle;
