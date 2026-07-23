import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const initializing = useAuthStore((state) => state.initializing);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return {
    user,
    initializing,
    isAuthenticated,
  };
};
