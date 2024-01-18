import type { Control, FieldValue, FieldValues } from "react-hook-form";
import { Text } from "react-native";
import { Controller } from "react-hook-form";

interface CustomSelectProps<TFieldValues extends FieldValues, TValue> {
  control: Control<TFieldValues>;
  name: FieldValue<TFieldValues>;
  values: TValue[] | Readonly<TValue[]>;
}

export function SelectField<
  TFieldValues extends FieldValues,
  TValues extends Record<PropertyKey, unknown>,
>(props: CustomSelectProps<TFieldValues, TValues>) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => <Text>Hello</Text>}
    />
  );
}
