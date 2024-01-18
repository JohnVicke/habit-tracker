import { Text } from "react-native";
import { router } from "expo-router";

import { Screen } from "~/components/screen";
import { useDeleteHabitMutation } from "~/graphql/mutations/delete-habit";

interface HabitProps {
  id: string;
}

export function Habit(props: HabitProps) {
  const { mutate, loading } = useDeleteHabitMutation();
  return (
    <Screen>
      <Text
        onPress={() =>
          mutate({
            variables: { deleteHabitId: props.id },
            onCompleted: () => {
              router.back();
            },
          })
        }
      >
        Remove Habit
      </Text>
    </Screen>
  );
}
