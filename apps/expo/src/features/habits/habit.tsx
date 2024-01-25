import React from "react";
import { View } from "react-native";

import { Screen } from "~/components/screen";
import { Typography } from "~/components/typography";
import { trpc } from "~/utils/trpc";
import { BottomNavigation } from "../dashboard/bottom-navigation";
import { Main } from "./main";
import { YearlySummary } from "./yearly-summary";

interface HabitProps {
  id: string;
}

const screens = [{ name: "yearly" }, { name: "main" }] as const;

type Screens = (typeof screens)[number];

const screenMap = {
  main: Main,
  yearly: YearlySummary,
} satisfies Record<Screens["name"], () => JSX.Element>;

export function Habit(props: HabitProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextScreen = React.useCallback(() => {
    if (activeIndex + 1 >= screens.length) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((prev) => prev + 1);
  }, [activeIndex, setActiveIndex]);

  const prevScreen = React.useCallback(() => {
    if (activeIndex - 1 < 0) {
      setActiveIndex(screens.length - 1);
      return;
    }

    setActiveIndex((prev) => prev - 1);
  }, [activeIndex, setActiveIndex]);

  const CurrentScreen = React.useMemo(() => {
    const key = screens[activeIndex].name;
    return screenMap[key];
  }, [activeIndex]);

  const { data, isLoading, isError } = trpc.habit.byId.useQuery({
    id: props.id,
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!data || isError) {
    return <Typography>oops something went wrong</Typography>;
  }

  return (
    <Screen>
      <Typography bold>{data.name}</Typography>
      <View className="flex-1">
        <CurrentScreen />
      </View>
      <BottomNavigation
        nextScreen={nextScreen}
        prevScreen={prevScreen}
        screens={screens}
        activeScreen={screens[activeIndex]!}
      />
    </Screen>
  );
}
