import * as SecureStore from "expo-secure-store";

type Keys = "onboarding";

interface Values {
  onboarding: {
    introduction?: boolean;
    habitLoop?: boolean;
    neuroplasticity?: boolean;
    gettingStarted?: boolean;
  };
}

export const secureStore = {
  async getItem<T extends Keys>(key: T): Promise<Values[T] | null> {
    const value = await SecureStore.getItemAsync(key);

    if (!value) return null;

    if ((typeof value as Values[T]) === "object") {
      return JSON.parse(value) as Values[T];
    }

    return value as Values[T];
  },
  async setItem<T extends Keys>(key: T, value: Values[T]) {
    return SecureStore.setItemAsync(
      key,
      typeof value === "object" ? JSON.stringify(value) : value,
    );
  },
  async deleteItem(key: Keys) {
    return SecureStore.deleteItemAsync(key);
  },
};
