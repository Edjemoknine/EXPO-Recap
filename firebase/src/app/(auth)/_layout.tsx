import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

export default function PublicLayout() {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(protected)/profile" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
