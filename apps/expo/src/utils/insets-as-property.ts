import type { StyleProp, ViewStyle } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import { capitalize } from "./capitalize";
import { objectEntries } from "./object-entries";

type Property = "padding" | "margin";

export function insetsAsProperty(
  edges: EdgeInsets,
  property: Property = "padding",
) {
  return objectEntries(edges).reduce((acc, [key, value]) => {
    // @ts-expect-error this is fine
    acc[`${property}${capitalize(key)}`] = value;
    return acc;
  }, {} as StyleProp<ViewStyle>);
}
