import type { Control, FieldValue, FieldValues } from "react-hook-form";
import type { SelectProps } from "tamagui";
import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { Controller } from "react-hook-form";
import { Adapt, Select, Sheet } from "tamagui";

interface CustomSelectProps<TFieldValues extends FieldValues, TValue>
  extends Omit<SelectProps, "defaultValue"> {
  control: Control<TFieldValues>;
  name: FieldValue<TFieldValues>;
  values: TValue[] | Readonly<TValue[]>;
  displayValue: (value: TValue) => string;
  getValue: (value: TValue) => string;
  groupLabel: string;
  width?: number;
}

export function SelectField<
  TFieldValues extends FieldValues,
  TValues extends Record<PropertyKey, unknown>,
>({
  values,
  displayValue,
  getValue,
  groupLabel,
  width,
  name,
  control,
  ...rest
}: CustomSelectProps<TFieldValues, TValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          native
          defaultValue={getValue(field.value)}
          {...rest}
          {...field}
        >
          <Select.Trigger width={width} iconAfter={ChevronDown}>
            <Select.Value placeholder="daily" />
          </Select.Trigger>
          <Adapt platform="touch">
            <Sheet
              native
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: "spring",
                damping: 20,
                mass: 1.2,
                stiffness: 250,
              }}
            >
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>
          <Select.Content zIndex={9999}>
            <Select.ScrollUpButton />
            <Select.Viewport>
              <Select.Group>
                <Select.Label>{groupLabel}</Select.Label>
                {values.map((value, index) => (
                  <Select.Item
                    key={`select-${index}`}
                    index={index}
                    value={getValue(value)}
                  >
                    <Select.ItemText>{displayValue(value)}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select>
      )}
    />
  );
}
