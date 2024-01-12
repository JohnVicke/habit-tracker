import type { Edge } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "tamagui";

import { capitalize } from "~/utils/capitalize";

export function Screen(props: React.PropsWithChildren) {
  const styles = useSafeAreaInsetsStyle(
    { bottom: 16, top: 16, left: 8, right: 8 },
    ["top", "left", "right", "bottom"],
  );
  return (
    <View flex={1} {...styles}>
      {props.children}
    </View>
  );
}

type Property = "margin" | "padding";

function useSafeAreaInsetsStyle(
  spacing: Record<Edge, number>,
  edges: Edge[] = [],
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
