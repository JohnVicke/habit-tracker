import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, Tabs } from "expo-router";
import { BarChart3, CalendarCheck2, Plus } from "lucide-react-native";

import { insetsAsProperty } from "~/utils/insets-as-property";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: Header,
      }}
      tabBar={TabBar}
    />
  );
}

function Header() {
  const styles = useSafeAreaInsets();
  return (
    <View {...styles} className="bg-slate-200 px-4 py-2">
      <Text className="font-qs-regular text-lg">
        hello,{"\n"}
        <Text>Viktor Malmedal</Text>
      </Text>
      <View className="my-2 border-b border-slate-300" />
    </View>
  );
}

type TabBarProps = React.ComponentProps<
  NonNullable<Parameters<typeof Tabs>[0]["tabBar"]>
>;

function TabBar(props: TabBarProps) {
  const { insets } = props;
  const padding = insetsAsProperty(insets);
  return (
    <View style={padding} className="flex h-16 items-start bg-slate-300">
      <View className="w-full flex-row justify-around">
        <Link href="/(main)/(tabs)/dashboard">
          <CalendarCheck2 className="text-slate-900" />
        </Link>
        <Link href="/add-habit">
          <View className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
            <Plus className="text-slate-900" />
          </View>
        </Link>
        <Link href="/(main)/(tabs)/statistics">
          <BarChart3 className="text-slate-900" />
        </Link>
      </View>
    </View>
  );
}
