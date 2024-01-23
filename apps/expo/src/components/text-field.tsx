import type { Control, FieldValues, Path } from "react-hook-form";
import type { KeyboardType } from "react-native";
import { Text, TextInput, View } from "react-native";
import { Controller } from "react-hook-form";

import { Typography } from "./typography";

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  keyboardType?: KeyboardType;
}

export function TextField<T extends FieldValues>(props: TextFieldProps<T>) {
  const keyboardType = props.keyboardType ?? "default";

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => (
        <View>
          {props.label && <Typography>{props.label}</Typography>}
          <TextInput
            keyboardType={keyboardType}
            onChange={(e) => field.onChange(e.nativeEvent.text)}
            onBlur={field.onBlur}
            placeholder={props.placeholder}
            className="rounded bg-slate-800 px-2 py-3 font-qs-regular text-slate-200"
          />
          {fieldState.error && (
            <Text className="font-qs-regular text-red-400">
              {fieldState.error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
