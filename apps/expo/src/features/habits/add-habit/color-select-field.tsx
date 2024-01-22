import type { Control, FieldValues, Path } from "react-hook-form";
import type { GestureResponderEvent } from "react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Controller } from "react-hook-form";

import { Typography } from "~/components/typography";
import { objectKeys } from "~/utils/object-keys";

interface ColorSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
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
          {props.label && <Typography>{props.label}</Typography>}
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
  teal: "border-teal-500 ",
  emerald: "border-emerald-500",
  indigo: "border-indigo-500",
  purple: "border-purple-500",
  pink: "border-pink-500",
  red: "border-red-500",
  orange: "border-orange-500",
  blue: "border-blue-500",
  sky: "border-sky-500",
  violet: "border-violet-500",
  fuchsia: "border-fuchsia-500",
  rose: "border-rose-500",
  amber: "border-amber-500",
  lime: "border-lime-500",
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
        className={`flex h-10 w-10 items-center justify-center rounded-[0.5rem] p-2 
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
