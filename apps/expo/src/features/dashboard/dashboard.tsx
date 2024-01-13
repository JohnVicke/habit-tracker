import { View } from "react-native";
import { Link } from "expo-router";
import { useQuery } from "@apollo/client";
import { PlusCircle } from "@tamagui/lucide-icons";
import { add, format } from "date-fns";
import { Circle, H3, ScrollView, Text, XStack, YStack } from "tamagui";

import { graphql } from "@ht/api/client";

import { Screen } from "~/components/screen";
import { getHabitCalendarDays } from "~/utils/date";

const habitsQuery = graphql(/* GraphQL */ `
  query Habits {
    habits {
      id
      userId
      name
      type
      frequency
      createdAt
      endDate
      description
    }
  }
`);

export function Dashboard() {
  const { data, loading, error } = useQuery(habitsQuery);

  return (
    <Screen>
      <YStack space>
        {data?.habits.map((habit) => (
          <YStack space={4} key={habit.id}>
            <H3>{habit.name}</H3>
            <ScrollView horizontal>
              <XStack space>
                {new Array(7).fill(null).map((_, index) => {
                  const today = new Date();
                  const nextDay = add(today, { days: index });
                  const weekDay = format(nextDay, "iiiii");
                  const dayOfMonth = format(nextDay, "dd");
                  return (
                    <View
                      key={`date-${habit.id}-${index}`}
                      className="flex items-center gap-y-2"
                    >
                      <Circle backgroundColor="white" width="$4" height="$4">
                        <Text color="black" fontWeight="bold">
                          {dayOfMonth}
                        </Text>
                      </Circle>
                      <Text>{weekDay}</Text>
                    </View>
                  );
                })}
              </XStack>
            </ScrollView>
          </YStack>
        ))}
      </YStack>
    </Screen>
  );
}
