import React from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

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
            <Text>Last month</Text>
          </Animated.View>
          <View>
            <DashboardSection>
              <DashboardSection.Title>Insights</DashboardSection.Title>
              <WeeklyProgress />
            </DashboardSection>
            <DashboardSection>
              <DashboardSection.Title>Insights</DashboardSection.Title>
              <WeeklyProgress />
            </DashboardSection>
          </View>
        </View>
      </Animated.ScrollView>
    </Screen>
  );
}

function DashboardSection(props: React.PropsWithChildren) {
  return <View>{props.children}</View>;
}

function DashboardSectionTitle(props: React.PropsWithChildren) {
  return <Text>{props.children}</Text>;
}

DashboardSection.Title = DashboardSectionTitle;
