import { router } from "expo-router";
import { Button } from "tamagui";

import { Screen } from "~/components/screen";
import { useDeleteHabitMutation } from "~/graphql/mutations/delete-habit";

interface HabitProps {
  id: string;
}

export function Habit(props: HabitProps) {
  const { mutate, loading } = useDeleteHabitMutation();
  return (
    <Screen>
      <Button
        theme="red"
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
      </Button>
    </Screen>
  );
}
