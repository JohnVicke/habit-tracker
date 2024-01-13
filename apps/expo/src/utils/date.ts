import { add } from "date-fns";

interface GetHabitCalendarDaysParams {
  previousWeeks: number;
  comingWeeks: number;
}

export function getHabitCalendarDays(
  { previousWeeks, comingWeeks }: GetHabitCalendarDaysParams,
  date = new Date(),
) {
  const start = add(date, { weeks: -previousWeeks });
  const end = add(date, { weeks: comingWeeks });
  return {
    start,
    end,
    today: date,
    length: previousWeeks * 7 + comingWeeks * 7,
  };
}
