import {
  cancelScheduledNotificationAsync,
  scheduleNotificationAsync,
  setNotificationHandler,
} from "expo-notifications";

setNotificationHandler({
  // eslint-disable-next-line @typescript-eslint/require-await
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function schedulePushNotification() {
  await scheduleNotificationAsync({
    identifier: "identifier",
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

export async function removeScheduledNotificationAsync(identifier: string) {
  await cancelScheduledNotificationAsync(identifier);
}
