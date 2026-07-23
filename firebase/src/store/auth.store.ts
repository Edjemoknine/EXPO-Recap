import { AuthState } from "@/auth/type";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  initializing: true,

  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: user !== null,
    }),

  setInitializing: (value) =>
    set({
      initializing: value,
    }),

  reset: () =>
    set({
      user: null,
      isAuthenticated: false,
      initializing: false,
    }),
}));
