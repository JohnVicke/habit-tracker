import React from "react";
import { View } from "react-native";

import { Typography } from "~/components/typography";
import { trpc } from "~/utils/trpc";

export function Dashboard() {
  const { data } = trpc.habit.all.useQuery();
  return (
    <View className="mb-2 flex-1 gap-y-4">
      {data?.map((habit) => (
        <View key={habit.id} className="rounded bg-slate-900 p-4">
          <Typography bold>{habit.name}</Typography>
        </View>
      ))}
    </View>
  );
}
