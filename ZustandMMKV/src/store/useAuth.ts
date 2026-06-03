import { Alert } from "react-native";
import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";

export const storage = createMMKV({ id: "auth-storage" });

export interface AuthStore {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
  checkAuth: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async (username, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30, // optional, defaults to 60
        }),
        credentials: "include", // Include cookies (e.g., accessToken) in the request
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const authData = {
        isAuthenticated: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user,
      };
      set(authData);
      storage.set("authData", JSON.stringify(authData)); // Persist auth data in MMKV
      return data;
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again.",
      );
      set({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      });
      console.error("Login failed:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
  logout: () => {
    storage.remove("authData");
    set({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
    });
  },
  refresh: async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: get().refreshToken, // Optional, if not provided, the server will use the cookie
          expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
        }),
        credentials: "include", // Include cookies (e.g., accessToken) in the request
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const authData = {
        ...get(),
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      set(authData);
      storage.set("authData", JSON.stringify(authData));
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  },
  checkAuth: async () => {
    const prevAuth = storage.getString("authData");
    const prevAuthData = prevAuth ? JSON.parse(prevAuth) : null;
    if (!prevAuthData) {
      return;
    }
    if (prevAuthData) {
      set(prevAuthData);
      await get().refresh(); // Attempt to refresh tokens on app start
    }
  },
}));
