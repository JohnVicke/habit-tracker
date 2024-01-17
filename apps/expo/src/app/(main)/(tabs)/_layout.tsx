import React from "react";
import { View } from "react-native";
import { Link, Tabs } from "expo-router";

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
  const { state, descriptors, navigation, insets } = props;
  return (
    <View
      className="relative flex-row items-center justify-between px-4"
      style={insets}
    >
      <Link href="/(main)/(tabs)/dashboard">heart</Link>
      <Link asChild href="/(main)/(modals)/add-habit">
        Plus
      </Link>
      <Link href="/(main)/(tabs)/statistics" asChild>
        BarChart
      </Link>
    </View>
  );
}
