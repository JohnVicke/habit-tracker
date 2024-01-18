import type { Control, FieldValue, FieldValues } from "react-hook-form";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Controller } from "react-hook-form";

interface NotificiationSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldValue<T>;
  placeholder?: string;
  label?: string;
}

export function NotificiationSelectField<T extends FieldValues>(
  props: NotificiationSelectFieldProps<T>,
) {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openSheet = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, [bottomSheetRef]);

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => (
        <>
          <TouchableOpacity className="flex-1" onPress={openSheet}>
            {props.label && (
              <Text className="mb-2 font-qs-regular text-slate-800">
                {props.label}
              </Text>
            )}
            <Text className="rounded bg-slate-100 px-2 py-4 font-qs-regular">
              {field.value ?? props.placeholder}
            </Text>
          </TouchableOpacity>
          <BottomSheetModal
            index={1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View>
              <Text>in sheet</Text>
            </View>
          </BottomSheetModal>
        </>
      )}
    />
  );
}
