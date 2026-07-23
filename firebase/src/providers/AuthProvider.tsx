import { useEffect, type PropsWithChildren } from "react";

import auth from "../../firebase/auth";
import { useAuthStore } from "../store/auth.store";

export default function AuthProvider({ children }: PropsWithChildren) {
  const setUser = useAuthStore((state) => state.setUser);

  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, [setUser, setInitializing]);

  return children;
}
