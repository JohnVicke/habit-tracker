import { View } from "react-native";
import { addMonths, format, getDaysInMonth } from "date-fns";
import { MotiView } from "moti";

import { Typography } from "~/components/typography";
import { cn } from "~/utils/cn";

const { today, months } = getYear();

export function YearlySummary() {
  return (
    <View className="mb-2 flex-row justify-between gap-y-4">
      <Typography>Yearly</Typography>
    </View>
  );
}

export function Foo() {
  return months.map((month, i) => (
    <View key={`${month.getMonth()}-i`} className="gap-y-4">
      <Typography bold>{format(month, "MMMMM")}</Typography>
      <MotiView className="gap-y-3">
        {Array(getDaysInMonth(month))
          .fill(null)
          .map((day, j) => {
            return (
              <MotiView
                key={`${month.getMonth()}-day-${i}-${j}`}
                from={{
                  opacity: 0,
                  translateY: -2 * (i + j),
                  translateX: -2 * (i + j),
                }}
                animate={{ opacity: 1, translateY: 0, translateX: 0 }}
                transition={{ delay: i * j * 2 }}
                className={cn("h-2 w-2 rounded bg-slate-500")}
              />
            );
          })}
      </MotiView>
    </View>
  ));
}

function getYear() {
  const today = new Date();
  const previousJanuary = new Date(today.getFullYear(), 0, 1);

  const months = Array(12)
    .fill(null)
    .map((_, i) => {
      const nextMonth = addMonths(previousJanuary, i);
      return nextMonth;
    });

  return { today, months };
}
