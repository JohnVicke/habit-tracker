import { View } from "react-native";
import { Link } from "expo-router";
import { useQuery } from "@apollo/client";
import { PlusCircle } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

import { graphql } from "@ht/api/client";

import { Screen } from "~/components/screen";

const dashboardQuery = graphql(/* GraphQL */ `
  query Dashboard {
    dashboard {
      totalHabits
      completedHabits
      longestStreak
    }
  }
`);

export function Dashboard() {
  const dashboardResult = useQuery(dashboardQuery);

  return (
    <Screen>
      <XStack>
        <Link href="/(main)/(modals)/add-habit">
          <PlusCircle />
        </Link>
      </XStack>
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
    </Screen>
  );
}
