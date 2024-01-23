import type { View } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { Link, Slot } from "expo-router";
import { Plus } from "lucide-react-native";

import { Screen } from "~/components/screen";

export default function SwipeNavigationLayout() {
  return (
    <Screen>
      <Slot />
      <Link href="/add-habit" asChild>
        <AddHabitButton />
      </Link>
    </Screen>
  );
}

interface AddHabitButtonProps {
  onPress?: VoidFunction;
}

const AddHabitButton = React.forwardRef<View, AddHabitButtonProps>(
  (props, ref) => {
    return (
      <Pressable
        className="absolute bottom-8 left-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-200 shadow shadow-emerald-300"
        ref={ref}
        onPress={props.onPress}
      >
        <Plus className="text-emerald-900" />
      </Pressable>
    );
  },
);

AddHabitButton.displayName = "AddHabitButton";
