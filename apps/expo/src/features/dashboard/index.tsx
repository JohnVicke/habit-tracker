import { View } from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";

import { Header } from "~/components/header";
import { Screen } from "~/components/screen";

export function Dashboard() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <Screen>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Header scrollOffset={scrollOffset} />
        <View className="gap-y-4" />
      </Animated.ScrollView>
    </Screen>
  );
}
