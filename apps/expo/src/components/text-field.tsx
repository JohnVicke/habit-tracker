import type { Control, FieldValue, FieldValues } from "react-hook-form";
import type { KeyboardType } from "react-native";
import { Controller } from "react-hook-form";
import { Input, Label, Text, YStack } from "tamagui";

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldValue<T>;
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
        <YStack>
          {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
          <Input
            {...field}
            placeholder={props.placeholder}
            id={props.name}
            onChange={(e) => {
              if (keyboardType === "numeric" || keyboardType === "number-pad") {
                return field.onChange(
                  parseInt(e.nativeEvent.text.replace(/[^0-9]/g, ""), 10),
                );
              }

              return field.onChange(e.nativeEvent.text);
            }}
          />
          <Text>{fieldState.error?.message}</Text>
        </YStack>
      )}
    />
  );
}
