import type { Control, FieldValue, FieldValues } from "react-hook-form";
import type { KeyboardType } from "react-native";
import { Controller } from "react-hook-form";

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
      render={({ field, fieldState }) => <>field</>}
    />
  );
}
