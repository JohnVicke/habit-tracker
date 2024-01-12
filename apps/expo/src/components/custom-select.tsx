import type { SelectProps } from "tamagui";
import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { Adapt, Select, Sheet } from "tamagui";

interface CustomSelectProps<T> extends Omit<SelectProps, "defaultValue"> {
  values: T[] | Readonly<T[]>;
  defaultValue: T;
  displayValue: (value: T) => string;
  getValue: (value: T) => string;
  groupLabel: string;
  width?: number;
}

export function CustomSelect<T extends Record<PropertyKey, unknown>>({
  defaultValue,
  values,
  displayValue,
  getValue,
  groupLabel,
  width,
  ...rest
}: CustomSelectProps<T>) {
  return (
    <Select native defaultValue={getValue(defaultValue)} {...rest}>
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
  );
}
