import { createContext, useContext, useEffect, useState } from "react";

import { storage, StorageKeys } from "@/utils/mmkv";

type ContextType = {
  hasOnboarded: boolean;
  loading: boolean;
  completeOnboarding: () => void;
};

const Context = createContext<ContextType>({} as ContextType);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const value = storage.getBoolean(StorageKeys.HAS_ONBOARDED);

    setHasOnboarded(value ?? false);
    setLoading(false);
  }, []);

  const completeOnboarding = () => {
    storage.set(StorageKeys.HAS_ONBOARDED, true);

    setHasOnboarded(true);
  };

  return (
    <Context.Provider
      value={{
        hasOnboarded,
        loading,
        completeOnboarding,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useOnboarding = () => useContext(Context);
