import type { LucideIcon } from "lucide-react-native";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { GestureResponderEvent } from "react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Book, Code, Dumbbell } from "lucide-react-native";
import { Controller } from "react-hook-form";

import { Typography } from "~/components/typography";

const defaultEmojiList = ["🏋️", "🏃", "🧘", "🧗", "🏊", "🚴", "🏄", "🏌️"];
const icons = [Dumbbell, Code, Book];

interface EmojiSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function EmojiSelectField<T extends FieldValues>(
  props: EmojiSelectFieldProps<T>,
) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <View className="gap-y-2">
          {props.label && <Typography>{props.label}</Typography>}
          <View className="flex gap-y-4">
            <EmojiGroup>
              {defaultEmojiList.map((emoji) => (
                <Icon
                  active={field.value === emoji}
                  onPress={() => field.onChange(emoji)}
                  key={emoji}
                  emoji={emoji}
                />
              ))}
              {icons.map((icon) => (
                <Icon
                  active={field.value === icon}
                  onPress={() => field.onChange(icon)}
                  key={icon.displayName}
                  icon={icon}
                />
              ))}
            </EmojiGroup>
          </View>
        </View>
      )}
    />
  );
}

type IconProps = {
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
} & (
  | {
      icon: LucideIcon;
      emoji?: never;
    }
  | { emoji: string; icon?: never }
);
function Icon(props: IconProps) {
  const RenderIcon = props.icon;
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        className={`flex h-12 w-12 items-center justify-center rounded-[0.5rem] bg-slate-100 text-slate-700 ${
          props.active && "border-2 border-slate-600 shadow shadow-slate-900"
        }`}
      >
        {RenderIcon && <RenderIcon className="text-slate-800" />}
        {props.emoji && <Typography size="lg">{props.emoji}</Typography>}
      </View>
    </TouchableOpacity>
  );
}

function EmojiGroup(props: React.PropsWithChildren) {
  return (
    <View className="flex flex-row flex-wrap gap-4">{props.children}</View>
  );
}
