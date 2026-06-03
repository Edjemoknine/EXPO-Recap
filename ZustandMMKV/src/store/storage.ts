import { createMMKV } from "react-native-mmkv";

export const storage = new createMMKV({ id: "cart-storage" });

export const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value === undefined ? null : value;
  },
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.delete(name),
};
