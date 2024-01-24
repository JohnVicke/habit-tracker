import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import { Typography } from "~/components/typography";
import { trpc } from "~/utils/trpc";

export function Dashboard() {
  const { data } = trpc.habit.all.useQuery();
  return (
    <View className="mb-2 flex-1 gap-y-4">
      {data?.map((habit) => (
        <Pressable
          key={habit.id}
          className="rounded bg-slate-900 p-4"
          onPress={() => {
            router.push(`/(main)/habit/${habit.id}`);
          }}
        >
          <Typography bold>{habit.name}</Typography>
        </Pressable>
      ))}
    </View>
  );
}
