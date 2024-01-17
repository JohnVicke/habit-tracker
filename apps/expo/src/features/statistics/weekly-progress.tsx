import { Text, View } from "react-native";
import { previousMonday } from "date-fns";

export function WeeklyProgress() {
  const today = new Date();
  const startOfWeek = previousMonday(today);
  return (
    <View>
      <Text>progress</Text>
    </View>
  );
}
