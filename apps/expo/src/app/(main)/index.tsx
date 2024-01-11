import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useQuery } from "@apollo/client";
import { H1, Text } from "tamagui";

import { graphql } from "@ht/api/client";

const dashboardQuery = graphql(/* GraphQL */ `
  query Dashboard {
    dashboard {
      totalHabits
      completedHabits
      longestStreak
    }
  }
`);

export default function Index() {
  const dashboardResult = useQuery(dashboardQuery);

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <H1>Habit Tracker</H1>
        {!dashboardResult.loading && dashboardResult.data?.dashboard && (
          <View className="flex space-y-2 py-2">
            <Text className="font-semibold italic">
              {dashboardResult.data.dashboard.completedHabits}
            </Text>
            <Text className="font-semibold italic">
              {dashboardResult.data.dashboard.totalHabits}
            </Text>
            <Text className="font-semibold italic">
              {dashboardResult.data.dashboard.longestStreak}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
