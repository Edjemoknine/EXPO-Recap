import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export const StorageKeys = {
  HAS_ONBOARDED: "has_onboarded",
  TOKEN: "token",
};
