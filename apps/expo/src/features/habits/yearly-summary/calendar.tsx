import { View } from "react-native";
import { format, getDaysInMonth } from "date-fns";

import { Typography } from "~/components/typography";
import { cn } from "~/utils/cn";

export function Foo({ months }: { today: Date; months: Date[] }) {
  return months.map((month, i) => (
    <View key={`${month.getMonth()}-i`} className="gap-y-4">
      <Typography bold>{format(month, "MMMMM")}</Typography>
      <View className="gap-y-3">
        {Array(getDaysInMonth(month))
          .fill(null)
          .map((day, j) => {
            return (
              <View
                key={`${month.getMonth()}-day-${i}-${j}`}
                className={cn("h-2 w-2 rounded bg-slate-500")}
              />
            );
          })}
      </View>
    </View>
  ));
}
