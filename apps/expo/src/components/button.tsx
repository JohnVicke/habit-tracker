import type { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ButtonProps {
  endIcon?: LucideIcon;
  startIcon?: LucideIcon;
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <TouchableOpacity>
      <View className="items-center justify-center self-center rounded bg-slate-800 px-4 py-3">
        {props.startIcon && (
          <View className="mr-2">
            <props.startIcon />
          </View>
        )}
        <Text className="font-qs-bold text-lg text-slate-100">
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
