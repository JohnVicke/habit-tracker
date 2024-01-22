import type { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ButtonProps {
  endIcon?: LucideIcon;
  startIcon?: LucideIcon;
  onPress?: VoidFunction;
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View className="items-center justify-center rounded-full bg-emerald-300 px-4 py-4">
        {props.startIcon && (
          <View className="mr-2">
            <props.startIcon />
          </View>
        )}
        <Text className="font-qs-bold text-lg text-slate-800">
          {props.children}
        </Text>
        {props.endIcon && (
          <View className="ml-2">
            <props.endIcon />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
