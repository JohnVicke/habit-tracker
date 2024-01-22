import * as SecureStore from "expo-secure-store";

interface Values {
  onboarding: {
    introduction?: boolean;
    habitLoop?: boolean;
    neuroplasticity?: boolean;
    gettingStarted?: boolean;
  };
}

type Keys = keyof Values;

export const secureStore = {
  async getItem<T extends Keys>(key: T): Promise<Values[T] | null> {
    const value = await SecureStore.getItemAsync(key);

    if (!value) return null;

    return JSON.parse(value) as Values[T];
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
