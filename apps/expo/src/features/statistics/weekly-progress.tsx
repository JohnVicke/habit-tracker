import { Text, View } from "react-native";
import { format, previousMonday } from "date-fns";

export function WeeklyProgress() {
  const today = new Date();
  const startOfWeek = previousMonday(today);
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

function DayProgress(props: DayProgressProps) {
  const weekDay = format(props.day, "iiiii");
  return (
    <View>
      <Text>{weekDay}</Text>
    </View>
  );
}
