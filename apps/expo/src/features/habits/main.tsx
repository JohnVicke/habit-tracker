import { View } from "moti";

import type { RouterOutputs } from "@ht/elysia";

import { Typography } from "~/components/typography";

interface MainProps {
  habit: RouterOutputs["habit"]["byId"];
}

export function Main(props: MainProps) {
  return (
    <View className="flex-1">
      <Typography>main</Typography>
    </View>
  );
}
