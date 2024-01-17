import React from "react";
import { Link, Tabs } from "expo-router";
import { BarChart, Heart, Plus } from "@tamagui/lucide-icons";
import { Circle, View } from "tamagui";

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
      flexDirection="row"
      height="$5"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      paddingHorizontal="$4"
      style={insets}
    >
      <TabButton>
        <Link href="/(main)/(tabs)/dashboard">
          <Heart />
        </Link>
      </TabButton>
      <Link asChild href="/(main)/(modals)/add-habit">
        <Circle
          elevate
          animation="bouncy"
          pressStyle={{
            scale: 0.95,
          }}
          bottom="$4"
          bordered
          backgroundColor="$background"
          size="$6"
        >
          <Plus />
        </Circle>
      </Link>
      <Link href="/(main)/(tabs)/statistics" asChild>
        <BarChart />
      </Link>
    </View>
  );
}

interface TabButtonProps {
  active?: boolean;
}

function TabButton({
  children,
  active = false,
}: React.PropsWithChildren<TabButtonProps>) {
  return (
    <View
      theme={active ? "blue" : ""}
      position="relative"
      animation="bouncy"
      pressStyle={{ scale: 0.9 }}
    >
      {children}
    </View>
  );
}
