import { StyleSheet } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { add, format, previousMonday } from "date-fns";
import {
  Button,
  Card,
  H4,
  ScrollView,
  Circle as TamaguiCircle,
  Text,
  Theme,
  XStack,
} from "tamagui";

export function WeeklyProgress() {
  const today = new Date();
  const startOfWeek = previousMonday(today);
  return (
    <Theme name="blue">
      <Card bordered animation="bouncy" pressStyle={{ scale: 0.95 }}>
        <Card.Header
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <H4>This week</H4>
          <Button variant="outlined">View all</Button>
        </Card.Header>
        <Card.Footer paddingHorizontal="$4" paddingBottom="$4">
          <ScrollView horizontal>
            <XStack space>
              {new Array(7).fill(null).map((_, index) => {
                const day = add(startOfWeek, { days: index });
                return <DayProgress day={day} key={`day-entry-${index}`} />;
              })}
            </XStack>
          </ScrollView>
        </Card.Footer>
      </Card>
    </Theme>
  );
}

interface DayProgressProps {
  day: Date;
  completions?: number;
}

function DayProgress(props: DayProgressProps) {
  const weekDay = format(props.day, "iiiii");
  return (
    <TamaguiCircle size="$4" bordered>
      <Text>{weekDay}</Text>
    </TamaguiCircle>
  );
}
