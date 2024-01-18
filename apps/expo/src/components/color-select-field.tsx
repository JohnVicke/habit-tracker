import type { Control, FieldValue, FieldValues } from "react-hook-form";
import type { GestureResponderEvent } from "react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Controller } from "react-hook-form";

import { objectKeys } from "~/utils/object-keys";

interface ColorSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldValue<T>;
  label?: string;
}

export function ColorSelectField<T extends FieldValues>(
  props: ColorSelectFieldProps<T>,
) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <View className="gap-y-2">
          {props.label && (
            <Text className="font-qs-regular text-slate-800">
              {props.label}
            </Text>
          )}
          <View className="flex gap-y-4">
            <ColorGroup>
              {objectKeys(colors).map((color) => (
                <ColorBox
                  onPress={() => field.onChange(color)}
                  active={field.value === color}
                  key={color}
                  color={color}
                />
              ))}
            </ColorGroup>
          </View>
        </View>
      )}
    />
  );
}

const colors = {
  teal: "bg-teal-200",
  emerald: "bg-emerald-200",
  indigo: "bg-indigo-200",
  purple: "bg-purple-200",
  pink: "bg-pink-200",
  red: "bg-red-200",
  orange: "bg-orange-200",
  blue: "bg-blue-200",
  sky: "bg-sky-200",
  violet: "bg-violet-200",
  fuchsia: "bg-fuchsia-200",
  rose: "bg-rose-200",
  amber: "bg-amber-200",
  lime: "bg-lime-200",
} as const;

const activeColors = {
  teal: "border-teal-600 ",
  emerald: "border-emerald-600",
  indigo: "border-indigo-600",
  purple: "border-purple-600",
  pink: "border-pink-600",
  red: "border-red-600",
  orange: "border-orange-600",
  blue: "border-blue-600",
  sky: "border-sky-600",
  violet: "border-violet-600",
  fuchsia: "border-fuchsia-600",
  rose: "border-rose-600",
  amber: "border-amber-600",
  lime: "border-lime-600",
} as const;

interface ColorBoxProps {
  color: keyof typeof colors;
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

function ColorBox(props: ColorBoxProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        className={`flex h-12 w-12 items-center justify-center rounded-[0.5rem] p-2 
${colors[props.color]}
${props.active ? `border-2 ${activeColors[props.color]}` : ""}
`}
      />
    </TouchableOpacity>
  );
}

function ColorGroup(props: React.PropsWithChildren) {
  return (
    <View className="flex flex-row flex-wrap gap-4">{props.children}</View>
  );
}
