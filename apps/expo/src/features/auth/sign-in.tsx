import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import * as Browser from "expo-web-browser";

export const signIn = async () => {
  const result = await Browser.openAuthSessionAsync(
    "http://localhost:3000/login/github",
    "exp://192.168.2.100:8081/login",
  );

  if (result.type !== "success") {
    throw new Error("Failed to sign in");
  }

  const url = Linking.parse(result.url);
  const sessionToken = url.queryParams?.session_token?.toString() ?? null;

  if (!sessionToken) {
    throw new Error("Failed to get session token");
  }

  await SecureStore.setItemAsync("session_token", sessionToken);
};

export const signOut = async () => {
  // TODO: Implement sign out request
  await SecureStore.deleteItemAsync("session_token");
};
