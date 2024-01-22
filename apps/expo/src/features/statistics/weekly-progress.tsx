import { Text, View } from "react-native";
import { format, previousMonday } from "date-fns";

export function WeeklyProgress() {
  const today = new Date();
  const _startOfWeek = previousMonday(today);
  return (
    <View>
      <Text>weekly</Text>
    </View>
  );
}

interface DayProgressProps {
  day: Date;
  completions?: number;
}

export function DayProgress(props: DayProgressProps) {
  const weekDay = format(props.day, "iiiii");
  return (
    <View>
      <Text>{weekDay}</Text>
    </View>
  );
}
