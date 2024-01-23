import React from "react";
import { View } from "react-native";
import { Link, Slot, useSegments } from "expo-router";
import { Plus } from "lucide-react-native";

import { Screen } from "~/components/screen";

const routes = [
  {
    href: "/dashboard",
    text: "Dashboard",
  },
  {
    href: "/profile",
    text: "Profile",
  },
];

export default function SwipeNavigationLayout() {
  const segments = useSegments();
  const activeRoute = React.useMemo(() => {
    const index = routes.findIndex(
      (route) => route.href.split("/")[1] === segments[2],
    );
    const next = routes[index > routes.length - 1 ? 0 : index + 1]!;
    const previous = routes[index < 0 ? routes.length - 1 : index - 1]!;
    return {
      next,
      previous,
      route: routes[index]!,
    };
  }, [segments]);

  return (
    <Screen>
      <Slot />
      <Link href="/add-habit">
        <View className="mb-0 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-200 shadow shadow-emerald-300">
          <Plus className="text-emerald-900" />
        </View>
      </Link>
    </Screen>
  );
}
