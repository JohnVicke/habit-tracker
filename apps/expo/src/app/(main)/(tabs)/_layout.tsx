import React from "react";
import { View } from "react-native";
import { Link, Tabs } from "expo-router";
import { BarChart3, CalendarCheck2, Plus } from "lucide-react-native";

import { insetsAsProperty } from "~/utils/insets-as-property";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={TabBar}
    />
  );
}

type TabBarProps = React.ComponentProps<
  NonNullable<Parameters<typeof Tabs>[0]["tabBar"]>
>;

function TabBar(props: TabBarProps) {
  const { insets } = props;
  const padding = insetsAsProperty(insets);
  return (
    <View style={padding} className="relative flex h-10 bg-emerald-100">
      <View className="flex w-full flex-row items-end justify-around">
        <Link href="/(main)/(tabs)/dashboard" asChild>
          <CalendarCheck2 className="text-emerald-900" />
        </Link>
        <Link href="/add-habit" asChild>
          <View className="mb-0 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-200 shadow shadow-emerald-300">
            <Plus className="text-emerald-900" />
          </View>
        </Link>
        <Link href="/(main)/(tabs)/statistics" asChild>
          <BarChart3 className="text-emerald-900" />
        </Link>
      </View>
    </View>
  );
}
