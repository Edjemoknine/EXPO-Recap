import type { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type AuthUser = FirebaseAuthTypes.User | null;

export interface AuthState {
  user: AuthUser;
  initializing: boolean;
  isAuthenticated: boolean;

  setUser: (user: AuthUser) => void;
  setInitializing: (value: boolean) => void;
  reset: () => void;
}
