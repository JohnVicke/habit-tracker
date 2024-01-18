import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Screen } from "~/components/screen";
import { useHabitsQuery } from "~/graphql/queries/habits";
import { Habit } from "./habit";

export function Dashboard() {
  const { data } = useHabitsQuery();
  return (
    <Screen>
      <ScrollView>
        <View className="gap-y-4">
          {data?.habits.map((habit, index) => (
            <Habit key={`${habit.__typename}-${index}`} habit={habit} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
