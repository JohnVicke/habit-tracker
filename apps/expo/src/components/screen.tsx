import type { Edge } from "react-native-safe-area-context";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { capitalize } from "~/utils/capitalize";

export function Screen(props: React.PropsWithChildren) {
  const styles = useSafeAreaInsetsStyle(["top", "left", "right", "bottom"], {
    bottom: 0,
    top: 0,
    left: 16,
    right: 16,
  });
  return (
    <View {...styles} className="flex-1 bg-emerald-50">
      {props.children}
    </View>
  );
}

type Property = "margin" | "padding";

function useSafeAreaInsetsStyle(
  edges: Edge[] = [],
  spacing: Record<Edge, number> = { bottom: 0, top: 0, left: 8, right: 8 },
  property: Property = "padding",
) {
  const insets = useSafeAreaInsets();
  return edges.reduce(
    (acc, edge) => {
      acc[`${property}${capitalize(edge)}`] = insets[edge] + spacing[edge];
      return acc;
    },
    {} as Record<string, number>,
  );
}
