import { createContext, useContext, useEffect, useState } from "react";

import { storage, StorageKeys } from "@/utils/mmkv";

type AuthContextType = {
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = storage.getString(StorageKeys.TOKEN);

    setUserToken(token ?? null);
    setLoading(false);
  }, []);

  const login = (token: string) => {
    storage.set(StorageKeys.TOKEN, token);
    setUserToken(token);
  };

  const logout = () => {
    storage.remove(StorageKeys.TOKEN);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
