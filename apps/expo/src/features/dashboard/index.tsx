import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { addMonths, format, getDaysInMonth } from "date-fns";
import { Plus } from "lucide-react-native";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

import { Typography } from "~/components/typography";
import { cn } from "~/utils/cn";

export function Dashboard() {
  const { today, months } = getYear();
  return (
    <View className="mb-2 flex-1 flex-row justify-between gap-y-4">
      {months.map((month, i) => (
        <View key={i} className="gap-y-4">
          <Typography bold>{format(month, "MMMMM")}</Typography>
          <MotiView className="gap-y-2">
            {new Array(getDaysInMonth(month)).fill(0).map((day, j) => (
              <MotiView
                key={`${i}-${j}`}
                from={{ opacity: 0, translateY: i + j }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: i * j * 10 }}
                className={cn("h-3 w-2 rounded bg-slate-500")}
              />
            ))}
          </MotiView>
        </View>
      ))}
    </View>
  );
}

export function AddHabitButton() {
  return (
    <MotiPressable
      onPress={() => {
        router.push("/add-habit");
      }}
    >
      <View className="mb-0 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-200 shadow shadow-emerald-300">
        <Plus className="text-emerald-900" />
      </View>
    </MotiPressable>
  );
}

function getYear() {
  const today = new Date();
  const previousJanuary = new Date(today.getFullYear(), 0, 1);

  const months = new Array(12).fill(0).map((_, i) => {
    const nextMonth = addMonths(previousJanuary, i);
    return nextMonth;
  });

  return { today, months };
}
