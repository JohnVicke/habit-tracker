import React from "react";
import { TouchableOpacity, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import colors from "tailwindcss/colors";

import type { AddHabitFormValues } from ".";
import { Typography } from "~/components/typography";
import { cn } from "~/utils/cn";

type Reminder = AddHabitFormValues["reminder"][number];

interface NotificiationSelectFieldProps {
  value: Reminder[];
  onChange: (value: Reminder[]) => void;
  placeholder: string;
  label: string;
}

export function NotificiationSelectField(props: NotificiationSelectFieldProps) {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openSheet = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, [bottomSheetRef]);

  return (
    <>
      <TouchableOpacity className="flex-1" onPress={openSheet}>
        {props.label && <Typography tw="mb-2">{props.label}</Typography>}
        <Typography tw="rounded bg-slate-800 px-2 py-3.5">
          {props.value.length > 0
            ? props.value
                .map(({ label }) => label)
                .join(", ")
                .trim()
            : props.placeholder}
        </Typography>
      </TouchableOpacity>
      <BottomSheetModal
        index={1}
        stackBehavior="replace"
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: colors.slate[100] }}
      >
        <View className="gap-y-4 px-4">
          <Typography bold size="xl">
            {props.label}
          </Typography>
          <View className="flex flex-row gap-x-2">
            {options.map((option) => (
              <NotificationOption
                key={option.value}
                option={option}
                active={
                  !!props.value.find(({ value }) => value === option.value)
                }
                onPress={() => {
                  if (props.value.find(({ value }) => value === option.value)) {
                    props.onChange(
                      props.value.filter(({ value }) => value !== option.value),
                    );
                  } else {
                    props.onChange([...props.value, option]);
                  }
                }}
              />
            ))}
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
}

const options = [
  {
    value: "monday",
    label: "M",
  },
  {
    value: "tuesday",
    label: "T",
  },
  {
    value: "wednesday",
    label: "W",
  },
  {
    value: "thursday",
    label: "T",
  },
  {
    value: "friday",
    label: "F",
  },
  {
    value: "saturday",
    label: "S",
  },
  {
    value: "sunday",
    label: "S",
  },
] satisfies Reminder[];

interface NotificationOptionProps {
  option: Reminder;
  active: boolean;
  onPress: () => void;
}

function NotificationOption(props: NotificationOptionProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        className={cn(
          "h-12 w-12 items-center justify-center rounded bg-slate-200",
          props.active && "border-2 border-slate-600 shadow shadow-slate-900",
        )}
      >
        <Typography bold={props.active} size="lg">
          {props.option.label}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}
