import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import { Typography } from "~/components/typography";
import { schedulePushNotification, useNotifications } from "~/notifications";
import { trpc } from "~/utils/trpc";

export function Dashboard() {
  const { data } = trpc.habit.all.useQuery();
  const { expoPushToken, notification } = useNotifications();
  return (
    <View className="mb-2 flex-1 gap-y-4">
      <Pressable
        onPress={() => {
          void schedulePushNotification({
            content: {
              title: "You've got mail! 📬",
              body: "Here is the notification body",
              data: { data: "goes here" },
            },
            trigger: { seconds: 2 },
          });
        }}
      >
        <Typography bold>Notifications</Typography>
      </Pressable>
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
