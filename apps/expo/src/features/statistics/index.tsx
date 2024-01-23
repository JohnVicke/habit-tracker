import React from "react";
import { View } from "react-native";
import { addMonths, format, getDaysInMonth } from "date-fns";
import { MotiView } from "moti";

import { Typography } from "~/components/typography";
import { cn } from "~/utils/cn";

export function Dashboard() {
  const { today, months } = getYear();
  return (
    <View className="mb-2 flex-row justify-between gap-y-4">
      {months.map((month, i) => (
        <View key={`${month.getDay()}-i`} className="gap-y-4">
          <Typography bold>{format(month, "MMMMM")}</Typography>
          <MotiView className="gap-y-3">
            {new Array(getDaysInMonth(month)).fill(0).map((day, j) => {
              return (
                <MotiView
                  key={`day-${i}-${j}`}
                  from={{
                    opacity: 0,
                    translateY: 2 * (i + j),
                    translateX: i + j,
                  }}
                  animate={{ opacity: 1, translateY: 0, translateX: 0 }}
                  transition={{ delay: i * j * 2 }}
                  className={cn("h-2 w-2 rounded bg-slate-500")}
                />
              );
            })}
          </MotiView>
        </View>
      ))}
    </View>
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
