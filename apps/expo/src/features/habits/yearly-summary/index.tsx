import React from "react";
import { View } from "react-native";
import { addMonths } from "date-fns";

import type { RouterOutputs } from "@ht/elysia";

import { Typography } from "~/components/typography";
import { Foo } from "./calendar";

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

const year = getYear();

interface YearlySummaryProps {
  habit: RouterOutputs["habit"]["byId"];
}

export function YearlySummary(props: YearlySummaryProps) {
  return (
    <View className="mb-2 flex-row justify-between gap-y-4">
      <Typography>Yearly</Typography>
      <Foo today={year.today} months={year.months} />
    </View>
  );
}
