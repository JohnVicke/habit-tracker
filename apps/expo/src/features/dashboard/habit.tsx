import { Text, View } from "react-native";

import { Button } from "~/components/button";

export function Habit() {
  return (
    <View className="rounded-xl border border-slate-300 bg-slate-100 p-4 shadow shadow-slate-200">
      <Text className="font-qs-bold text-2xl">hello</Text>
      <Button>Complete</Button>
    </View>
  );
}
