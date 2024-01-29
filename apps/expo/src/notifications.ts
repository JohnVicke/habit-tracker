import type { Notification, Subscription } from "expo-notifications";
import React from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  removeNotificationSubscription,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from "expo-notifications";
import colors from "tailwindcss/colors";

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
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function getToken() {
  const { status: existingStatus } = await getPermissionsAsync();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  if (existingStatus !== "granted") {
    const { status } = await requestPermissionsAsync();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (status !== "granted") {
      return null;
    }
  }
  const { data: token } = await getExpoPushTokenAsync();
  return token;
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.emerald[200],
    });
  }

  if (!Device.isDevice) {
    return null;
  }

  return getToken();
}

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<Notification | null>(
    null,
  );

  const notificationListener = React.useRef<Subscription>();
  const responseListener = React.useRef<Subscription>();

  React.useEffect(() => {
    registerForPushNotificationsAsync()
      .then(setExpoPushToken)
      .catch(console.error);

    notificationListener.current = addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    responseListener.current = addNotificationResponseReceivedListener(
      (response) => console.log(response),
    );

    return () => {
      if (notificationListener.current)
        removeNotificationSubscription(notificationListener.current);
      if (responseListener.current)
        removeNotificationSubscription(responseListener.current);
    };
  }, [
    setExpoPushToken,
    setNotification,
    notificationListener,
    responseListener,
  ]);

  return { expoPushToken, notification };
}
