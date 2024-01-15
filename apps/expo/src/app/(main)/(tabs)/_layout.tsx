import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { BarChart2, Heart, User2 } from "@tamagui/lucide-icons";
import { Square } from "tamagui";

export default function AppLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <Square marginTop={bottom}>
              <Heart />
            </Square>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarIcon: ({ focused }) => (
            <Square marginTop={bottom}>
              <BarChart2 />
            </Square>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Square marginTop={bottom}>
              <User2 />
            </Square>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}