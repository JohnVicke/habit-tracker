import React from "react";
import { TouchableOpacity, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import colors from "tailwindcss/colors";

import type { AddHabitFormValues } from ".";
import { Typography } from "~/components/typography";
import { cn } from "~/utils/cn";

type Interval = AddHabitFormValues["interval"];

interface NotificiationSelectFieldProps {
  value: Interval;
  onChange: (value: Interval) => void;
  placeholder?: string;
  label?: string;
  showOccurance: boolean;
  occuranceField: () => React.ReactNode;
}

export function StreakSelectField(props: NotificiationSelectFieldProps) {
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
        <Typography tw="rounded bg-slate-100 px-2 py-3.5">
          {props.value ?? props.placeholder}
        </Typography>
      </TouchableOpacity>
      <BottomSheetModal
        stackBehavior="replace"
        index={1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: colors.slate[100] }}
      >
        <View className="gap-y-4 px-4">
          <Typography bold size="lg">
            {props.label}
          </Typography>
          <View className="flex-row gap-x-2">
            {intervalOptions.map((interval) => (
              <IntervalOption
                onPress={() => props.onChange(interval)}
                key={interval}
                interval={interval}
                active={interval === props.value}
              />
            ))}
          </View>
          {props.showOccurance && props.occuranceField()}
        </View>
      </BottomSheetModal>
    </>
  );
}

const intervalOptions = [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY",
] satisfies Interval[];

interface IntervalOptionProps {
  interval: Interval;
  active: boolean;
  onPress: () => void;
}

function IntervalOption(props: IntervalOptionProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        className={cn(
          "h-12 items-center justify-center rounded bg-slate-200 px-2",
          props.active && "sahdow-slate-900 border-2 border-slate-600 shadow",
        )}
      >
        <Typography bold={props.active}>{props.interval}</Typography>
      </View>
    </TouchableOpacity>
  );
}
