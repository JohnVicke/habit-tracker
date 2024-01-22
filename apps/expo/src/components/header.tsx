import type { SharedValue } from "react-native-reanimated";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Typography } from "./typography";

interface HeaderProps {
  scrollOffset: SharedValue<number>;
}

export function Header(props: React.PropsWithChildren<HeaderProps>) {
  const [headerHeight, setHeaderHeight] = React.useState(0);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!headerHeight) return {};

    return {
      transform: [
        {
          translateY: interpolate(
            props.scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75],
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[headerAnimatedStyle]}
      className="bg-slate-200 px-4 py-2"
      onLayout={(event) => {
        if (!headerHeight) {
          setHeaderHeight(event.nativeEvent.layout.height);
        }
      }}
    >
      <Typography>hello</Typography>
    </Animated.View>
  );
}
