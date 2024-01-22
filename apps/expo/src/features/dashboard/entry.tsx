import { Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";

interface EntryProps {
  habitId: string;
  day: Date;
}

export function Entry(props: EntryProps) {
  const dayOfMonth = format(props.day, "dd");
  const weekDay = format(props.day, "iiiii");

  return (
    <View className="flex items-center gap-y-2">
      <TouchableOpacity
        onPress={() => {
          console.log("clicked");
        }}
      >
        <View>
          <Text>{dayOfMonth}</Text>
        </View>
      </TouchableOpacity>
      <Text>{weekDay}</Text>
    </View>
  );
}
