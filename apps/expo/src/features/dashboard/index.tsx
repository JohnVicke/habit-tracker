import { View } from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";

import { Header } from "~/components/header";
import { Screen } from "~/components/screen";
import { Typography } from "~/components/typography";
import { useHabitsQuery } from "~/graphql/queries/habits";
import { Habit } from "./habit";

export function Dashboard() {
  const { data } = useHabitsQuery();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <Screen>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Header scrollOffset={scrollOffset} />
        <View className="gap-y-4">
          {data?.habits.map((habit, index) => (
            <Habit key={`${habit.__typename}-${index}`} habit={habit} />
          ))}
        </View>
      </Animated.ScrollView>
    </Screen>
  );
}
